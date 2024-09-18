import { Prisma } from "@prisma/client";
import {
  calculateDiscountedPrice,
  getCartTotals,
  insertCartItemPayload,
} from "@/utils/CartManager/utils";
import db from "@/db/db";
import { NextResponse, NextRequest } from "next/server";
import { TParams } from "@/app/api/types";
import { TCartItemPayload } from "@/utils/CartManager/types";

export async function POST(
  req: NextRequest,
  { params }: TParams
): Promise<NextResponse> {
  try {
    const { id: cartId } = params;
    const { products: cartProducts } = await req.json();

    const dbProducts = await db.product.findMany({
      where: {
        id: {
          in: cartProducts.map(
            (product: Prisma.ProductGetPayload<{}>) => product.id
          ),
        },
      },
    });

    await Promise.all(
      dbProducts.map(async (dbProduct) => {
        const quantity = cartProducts.find(
          (cartProduct: TCartItemPayload) => cartProduct.id === dbProduct.id
        ).quantity;
        await db.cartItem.upsert({
          where: {
            cartId_productId: {
              cartId: Number(cartId),
              productId: dbProduct.id,
            },
          },
          update: {
            quantity,
            total: dbProduct.price * quantity,
            discountedTotal:
              calculateDiscountedPrice(
                dbProduct.price,
                dbProduct.discountPercentage
              ) * quantity,
          },
          create: {
            ...insertCartItemPayload({
              items: cartProducts,
              dbProduct,
              cartId: Number(cartId),
            }),
          },
        });
      })
    );

    const cartItems = await db.cartItem.findMany({
      where: {
        cartId: Number(cartId),
      },
    });

    const cartTotals = await getCartTotals(cartItems);

    const updatedCart = await db.cart.update({
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
    db.$disconnect();
  }
}
