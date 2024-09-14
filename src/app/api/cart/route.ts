import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import currency from "currency.js";
import Decimal from "decimal.js";
import { cookies } from "next/headers";
import db from "@/utils/db";
import { notFound } from "next/navigation";

const setCartCookie = (cartId, secret) => {
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

const getCartTotals = (cartProducts, dbProducts) => {
  const total = cartProducts.reduce((acc, product) => {
    const { price } = dbProducts.find(
      (dbProduct) => dbProduct.id === product.id
    );
    return acc + price;
  }, 0);

  const discountedTotal = cartProducts.reduce((acc, product) => {
    const { price, discountPercentage } = dbProducts.find(
      (dbProduct) => dbProduct.id === product.id
    );

    return acc + calculateDiscountedPrice(price, discountPercentage);
  }, 0);

  const totalQuantity = cartProducts.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  return { total, discountedTotal, totalQuantity };
};

function calculateDiscountedPrice(
  price: number,
  discountPercentage: number
): number {
  const percent = discountPercentage / 100;
  const discountAmount = (percent / 100 / 100) * price;
  return price - discountAmount;
}

export async function GET(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  try {
    return NextResponse.json({ data: {}, meta: {} }, { status: 200 });
  } catch (error) {
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
          in: cartProducts.map((product) => product.id),
        },
      },
    });

    const { total, discountedTotal, totalQuantity } = getCartTotals(
      cartProducts,
      dbProducts
    );

    const cart = await db.cart.create({
      data: {
        total,
        discountedTotal,
        totalQuantity,
        totalProducts: cartProducts.length,
        userId: userId || null,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    const cartItems = dbProducts.map((dbProduct) => {
      const quantity = cartProducts.find(
        (product) => product.id === dbProduct.id
      ).quantity;
      const discountedTotal = calculateDiscountedPrice(
        dbProduct.price,
        dbProduct.discountPercentage
      );

      return {
        cartId: cart.id,
        productId: dbProduct.id,
        title: dbProduct.title,
        price: dbProduct.price,
        quantity,
        total: dbProduct.price * quantity,
        discountPercentage: dbProduct.discountPercentage,
        discountedTotal,
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
