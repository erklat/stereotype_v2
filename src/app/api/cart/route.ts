import { Prisma } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import db from "@/db/db";
import { notFound } from "next/navigation";
import {
  calculateDiscountedPrice,
  getCartTotals,
  insertCartItemPayload,
} from "@/utils/CartManager/utils";
import { TCartItemPayload } from "@/utils/CartManager/types";
import {
  createCart,
  createCartItems,
  retreiveProducts,
} from "@/utils/CartManager/CartManager.db";

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

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { products: productsPayload } = await req.json();

    const cartData = await createCart(productsPayload);

    await createCartItems(productsPayload);

    if (!cartData) {
      return notFound();
    }

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
