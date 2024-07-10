import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  try {
    const payload = await req.json();

    console.log(payload);
    const { userId, product } = payload;
    const hashKey = crypto.randomBytes(20).toString("hex");

    const total = product.total;
    const discountedTotal = product.discountedTotal;
    const totalQuantity = product.quantity;

    const cart = await prisma.cart.create({
      data: {
        userId,
        total: product.price,
        discountedTotal:
          product.price - (product.discountPercentage / 100) * product.price,
        // totalProducts: products.length,
        totalProducts: 1,
        totalQuantity: 1,
        hashKey,
      },
      include: {
        cartItems: true,
      },
    });

    const cartItems = [product].map((product: any) => ({
      cartId: cart.id,
      ...product,
      productId: product.id,
      quantity: 1,
      total: product.price,
    }));

    await prisma.cartItem.createMany({
      data: cartItems,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 405 }
    );
  }
}

// export async function GET(req: NextRequest): Promise<NextResponse> {
//   try {
//     const users = await prisma.user.findMany();
//     return NextResponse.json(users);
//   } catch (error: unknown) {
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : String(error) },
//       { status: 405 }
//     );
//   }
// }
