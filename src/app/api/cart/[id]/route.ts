import { NextResponse, NextRequest } from "next/server";
import { notFound } from "next/navigation";
import { getCookieValue } from "@/utils/cookie";
import db from "@/utils/db";

export async function GET(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  try {
    const secret = await getCookieValue(req.headers.get("cookie"), "secret");

    if (!secret) {
      return NextResponse.json(
        { error: "Missing cart secret." },
        { status: 400 }
      );
    }

    // Find the active cart for the user
    const now = new Date();
    const activeCart = await db.cart.findFirst({
      where: {
        secret,
        status: "active",
        expiresAt: {
          gt: now,
        },
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    // If no active cart found, return 404 error
    if (!activeCart) {
      return notFound();
    }

    return NextResponse.json({ data: activeCart, meta: {} }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    await db.$disconnect(); // Disconnect Prisma client
  }
}
