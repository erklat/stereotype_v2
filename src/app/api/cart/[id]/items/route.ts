import { Prisma } from "@prisma/client";
import {
  calculateDiscountedPrice,
  getCartTotals,
} from "@/utils/CartManager/utils";
import db from "@/utils/db";
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
      dbProducts.map(async (product) => {
        const quantity = cartProducts.find(
          (cartProduct: TCartItemPayload) => cartProduct.id === product.id
        ).quantity;
        await db.cartItem.upsert({
          where: {
            cartId_productId: {
              cartId: Number(cartId),
              productId: product.id,
            },
          },
          update: {
            quantity,
            total: product.price * quantity,
            discountedTotal:
              calculateDiscountedPrice(
                product.price,
                product.discountPercentage
              ) * quantity,
          },
          create: {
            cartId: Number(cartId),
            productId: product.id,
            title: product.title,
            price: product.price,
            quantity,
            total: product.price * quantity,
            discountPercentage: product.discountPercentage,
            discountedTotal:
              calculateDiscountedPrice(
                product.price,
                product.discountPercentage
              ) * quantity,
            thumbnail: product.thumbnail,
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
