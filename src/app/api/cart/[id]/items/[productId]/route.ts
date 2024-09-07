import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  parseCartDataToResponse,
  calculateDiscountedPrice,
} from "@/utils/CartManager/utils";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; productId: string } }
): Promise<NextResponse> {
  try {
    const payload = await req.json();
    const { id: cartId, productId } = params;
    const { hashKey, quantity } = payload;

    const existingCart = await prisma.cart.findUnique({
      where: {
        id: Number(cartId),
        hashKey,
        status: "active",
        expiresAt: {
          gt: new Date(),
        },
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
      (item) => item.productId === Number(productId)
    );

    if (!existingCartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    if (quantity === 0) {
      await prisma.cartItem.delete({
        where: {
          cartId_productId: {
            cartId: Number(cartId),
            productId: Number(productId),
          },
        },
      });
    } else {
      await prisma.cartItem.update({
        where: {
          cartId_productId: {
            cartId: Number(cartId),
            productId: Number(productId),
          },
        },
        data: {
          quantity,
          total: Number(existingCartItem.price) * quantity,
          discountedTotal:
            calculateDiscountedPrice(
              Number(existingCartItem.price),
              Number(existingCartItem?.discountPercentage)
            ) * quantity,
        },
      });
    }

    await prisma.cart.update({
      where: {
        id: existingCart.id,
      },
      data: {
        updatedAt: new Date(Date.now()),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    // Fetch and return the updated cart data
    const updatedCart = await prisma.cart.findUnique({
      where: { id: existingCart.id },
      include: {
        cartItems: true,
      },
    });

    const response = parseCartDataToResponse(updatedCart);

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}
