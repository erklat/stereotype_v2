import { NextResponse, NextRequest } from "next/server";
import db from "@/utils/db";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  try {
    const products = await db.product.findMany({
      include: {
        // cartItems: true,
      },
    });

    const data = products.map((product) => {
      return {
        ...product,
        price: product.price / 100,
        discountPercentage: product.discountPercentage / 100,
        weight: product.weight / 100,
      };
    });

    return NextResponse.json({ data, meta: {} });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    await db.$disconnect(); // Disconnect db client
  }
}
