import { NextResponse, NextRequest } from "next/server";
import {
  calculateDiscountedPrice,
  getCartTotals,
} from "@/utils/CartManager/utils";
import db from "@/db/db";
import { getCookieValue, getCookie } from "@/utils/cookie";
import { Prisma } from "@prisma/client";
import { TCartItemPayload } from "@/utils/CartManager/types";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; productId: string } }
): Promise<NextResponse> {
  try {
    const payload = await req.json();
    const { secret } = await getCookie("cart_data");

    const { id: cartId, productId } = params;
    const { quantity } = payload;

    if (!secret) {
      return NextResponse.json(
        { error: "Missing cart secret." },
        { status: 403 }
      );
    }

    const existingCart = await db.cart.findUnique({
      where: {
        id: Number(cartId),
        secret,
        status: "active",
      },
      include: {
        cartItems: true,
      },
    });

    if (!existingCart) {
      return NextResponse.json(
        { error: "No active cart found for the user" },
        { status: 404 }
      );
    }

    const existingCartItem = existingCart.cartItems.find(
      (item: Prisma.CartItemGetPayload<{}>) =>
        item.productId === Number(productId)
    );

    if (!existingCartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    await db.cartItem.update({
      where: {
        cartId_productId: {
          cartId: Number(cartId),
          productId: Number(productId),
        },
      },
      data: {
        quantity,
        total: existingCartItem.price * quantity,
        discountedTotal:
          calculateDiscountedPrice(
            existingCartItem.price,
            existingCartItem.discountPercentage
          ) * quantity,
      },
    });

    const cartItems = await db.cartItem.findMany({
      where: {
        cartId: Number(cartId),
      },
    });

    console.log(cartItems);

    const cartTotals = await getCartTotals(
      cartItems.map((item) => ({ id: item.productId, quantity: item.quantity }))
    );

    const updatedCart = await db.cart.update({
      where: {
        id: existingCart.id,
      },
      data: {
        ...cartTotals,
        updatedAt: new Date(Date.now()),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        cartItems: {
          include: { product: true },
        },
      },
    });

    return NextResponse.json({ data: updatedCart, meta: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; productId: string } }
): Promise<NextResponse> {
  try {
    const payload = await req.json();
    const secret = await getCookieValue(req.headers.get("cookie"), "secret");

    const { id: cartId, productId } = params;

    if (!secret) {
      return NextResponse.json({ data: {}, meta: {} }, { status: 403 });
    }

    await db.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: Number(cartId),
          productId: Number(productId),
        },
      },
    });

    const cartItems = await db.cartItem.findMany({
      where: {
        cartId: Number(cartId),
      },
    });

    const cartTotals = await getCartTotals(
      cartItems.map((item) => ({ id: item.id, quantity: item.quantity }))
    );

    const cartData = await db.cart.update({
      where: {
        id: Number(cartId),
      },
      data: {
        ...cartTotals,
        updatedAt: new Date(Date.now()),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json({ data: cartData, meta: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
