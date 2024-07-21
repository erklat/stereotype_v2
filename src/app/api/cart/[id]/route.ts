import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getCookie } from "@/utils/actions";
import {
  parseCartDataToResponse,
  calculateDiscountedPrice,
} from "@/utils/CartManager/utils";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  try {
    const cookie = await getCookie("cart_data");
    const { userId, hashKey } = cookie;

    if (!userId || !hashKey) {
      return NextResponse.json(
        { error: "Missing userId or hashKey" },
        { status: 400 }
      );
    }

    // Find the active cart for the user
    const now = new Date();
    const activeCart = await prisma.cart.findFirst({
      where: {
        userId: parseInt(userId),
        hashKey,
        status: "active",
        expiresAt: {
          gt: now,
        },
      },
      include: {
        cartItems: true,
      },
    });

    // If no active cart found, return 404 error
    if (!activeCart) {
      return NextResponse.json(
        { error: "No active cart found for the user" },
        { status: 404 }
      );
    }

    // Update carts that have expired to abandoned status
    if (activeCart.expiresAt <= now) {
      await prisma.cart.update({
        where: { id: activeCart.id },
        data: { status: "abandoned" },
      });
    }

    // Prepare response
    const response = {
      ...activeCart,
      total: activeCart.total.toNumber(),
      discountedTotal: activeCart.discountedTotal.toNumber(),
      cartItems: activeCart.cartItems.map((item) => ({
        ...item,
        price: item.price.toNumber(),
        total: item.total.toNumber(),
        discountedTotal: item.discountedTotal.toNumber(),
        discountPercentage: item.discountPercentage.toNumber(),
      })),
    };

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}

export async function POST(
  req: NextRequest,
  { params }: NextResponse
): Promise<NextResponse> {
  try {
    const payload = await req.json();
    const { id } = params;
    const cartId = Number(id);
    const { userId, hashKey, products: newProducts } = payload;

    const existingCart = await prisma.cart.findUnique({
      where: {
        id: Number(cartId),
        userId: parseInt(userId),
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

    const updateCart = async () => {
      await Promise.all(
        newProducts.map(async (product) => {
          await prisma.cartItem.upsert({
            where: {
              cartId_productId: {
                cartId: Number(cartId),
                productId: product.id,
              },
            },
            update: {
              quantity: product.quantity,
              total: product.price * product.quantity,
              discountedTotal:
                calculateDiscountedPrice(
                  product.price,
                  product.discountPercentage
                ) * product.quantity,
            },
            create: {
              cartId: Number(cartId),
              productId: product.id,
              title: product.title,
              price: product.price,
              quantity: product.quantity,
              total: product.price * product.quantity,
              discountPercentage: product.discountPercentage,
              discountedTotal:
                calculateDiscountedPrice(
                  product.price,
                  product.discountPercentage
                ) * product.quantity,
              thumbnail: product.thumbnail,
            },
          });
        })
      );

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

      return updatedCart;
    };

    const cartData = await updateCart();

    const response = parseCartDataToResponse(cartData);

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}
