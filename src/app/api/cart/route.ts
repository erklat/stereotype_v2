import { Prisma } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import db from "@/utils/db";
import { notFound } from "next/navigation";
import {
  calculateDiscountedPrice,
  getCartTotals,
} from "@/utils/CartManager/utils";
import { TCartItemPayload } from "@/utils/CartManager/types";

const setCartCookie = (cartId: number, secret: string) => {
  const responseCookies = cookies();
  return responseCookies.set(
    "cart_data",
    JSON.stringify({
      cartId,
      secret,
    }),
    {
      httpOnly: true,
      path: "/",
    }
  );
};

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    return NextResponse.json({ data: {}, meta: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 405 }
    );
  } finally {
    db.$disconnect();
  }
}

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  try {
    const { products: cartProducts } = await req.json();
    const userId = null;

    const dbProducts = await db.product.findMany({
      where: {
        id: {
          in: cartProducts.map(
            (product: Prisma.ProductGetPayload<{}>) => product.id
          ),
        },
      },
    });

    const cartTotals = await getCartTotals(
      cartProducts.map((product: TCartItemPayload) => ({
        id: product.id,
        quantity: product.quantity,
      }))
    );

    const cart = await db.cart.create({
      data: {
        ...cartTotals,
        totalProducts: cartProducts.length,
        userId: userId || null,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    const cartItems = dbProducts.map((dbProduct) => {
      const quantity = cartProducts.find(
        (product: TCartItemPayload) => product.id === dbProduct.id
      ).quantity;

      return {
        cartId: cart.id,
        productId: dbProduct.id,
        title: dbProduct.title,
        price: dbProduct.price,
        quantity,
        total: dbProduct.price * quantity,
        discountPercentage: dbProduct.discountPercentage,
        discountedTotal:
          calculateDiscountedPrice(
            dbProduct.price,
            dbProduct.discountPercentage
          ) * quantity,
        thumbnail: dbProduct.thumbnail,
      };
    });

    await db.cartItem.createMany({ data: cartItems });

    const cartData = await db.cart.findUnique({
      where: { id: cart.id },
      include: {
        cartItems: true,
      },
    });

    if (!cartData) {
      return notFound();
    }

    setCartCookie(cart.id, cartData.secret);

    return NextResponse.json({ data: cartData, meta: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 405 }
    );
  } finally {
    await db.$disconnect(); // Disconnect Prisma client
  }
}

export async function PATCH() {
  try {
    return NextResponse.json({ data: {}, meta: {} }, { status: 200 });
  } catch (error) {
  } finally {
    await db.$disconnect();
  }
}

export async function DELETE() {
  try {
    return NextResponse.json({ data: {}, meta: {} }, { status: 200 });
  } catch (error) {
  } finally {
    await db.$disconnect;
  }
}
