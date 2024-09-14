import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import currency from "currency.js";
import Decimal from "decimal.js";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

function calculateDiscountedPrice(
  price: number,
  discountPercentage: number
): number {
  const discountAmount = (discountPercentage / 100) * price;
  return price - discountAmount;
}

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  try {
    const payload = await req.json();

    const { userId, products } = payload;
    const hashKey = crypto.randomBytes(20).toString("hex");

    // Calculate totals for the entire cart
    const total = products.reduce(
      (acc: number, product: any) => acc + product.price * product.quantity,
      0
    );
    const discountedTotal = products.reduce(
      (acc: number, product: any) =>
        acc +
        calculateDiscountedPrice(product.price, product.discountPercentage) *
          product.quantity,
      0
    );
    const totalQuantity = products.reduce(
      (acc: number, product: any) => acc + product.quantity,
      0
    );

    // Create the cart
    const cart = await prisma.cart.create({
      data: {
        userId: userId || null,
        total: total * 100,
        discountedTotal: discountedTotal * 100,
        totalProducts: products.length,
        totalQuantity,
        hashKey,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    // Map products to cart items
    const cartItems = products.map((product: any) => ({
      cartId: cart.id,
      productId: product.id,
      title: product.title,
      price: product.price * 100,
      quantity: product.quantity,
      total: product.price * 100 * product.quantity,
      discountPercentage: product.discountPercentage * 100,
      discountedTotal:
        calculateDiscountedPrice(product.price, product.discountPercentage) *
        product.quantity,
      thumbnail: product.thumbnail,
    }));

    await prisma.cartItem.createMany({
      data: cartItems,
    });

    // Fetch the complete cart with cart items
    const cartData = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { cartItems: true },
    });

    if (!cartData) throw new Error("Error retrieving cart from DB.");

    console.log(cartData);

    const response = {
      ...cartData,
      total: currency(cartData.total),
      discountedTotal: currency(cartData.discountedTotal),
      cartItems: cartData?.cartItems.map((item) => ({
        ...item,
        price: currency(item.price),
        total: currency(item.total),
        discountedTotal: item.discountedTotal
          ? currency(item.discountedTotal)
          : 0,
        discountPercentage: item.discountPercentage
          ? currency(item.discountPercentage)
          : 0,
      })),
    };

    // Set cookies
    const responseCookies = cookies();
    responseCookies.set(
      "cart_data",
      JSON.stringify({
        cartId: cart.id,
        userId,
        hashKey,
      }),
      {
        httpOnly: true,
        path: "/",
      }
    );

    return NextResponse.json({ data: response });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 405 }
    );
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}
