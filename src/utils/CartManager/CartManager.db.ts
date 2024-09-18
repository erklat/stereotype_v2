import db from "@/db/db";
import { Prisma } from "@prisma/client";
import {
  getCartTotals,
  insertCartItemPayload,
} from "@/utils/CartManager/utils";
import { TCartItemPayload } from "@/utils/CartManager/types";
import { setCookie } from "@/utils/cookie";

export const retreiveProducts = async (cartProducts: TCartItemPayload[]) => {
  return await db.product.findMany({
    where: {
      id: {
        in: cartProducts.map((product: TCartItemPayload) => product.id),
      },
    },
  });
};

export const createCart = async ({
  cartProducts = [],
  userId,
}: {
  cartProducts: TCartItemPayload[];
  userId?: string;
}) => {
  const cartTotals = await getCartTotals(
    cartProducts.map((product: TCartItemPayload) => ({
      id: product.id,
      quantity: product.quantity,
    }))
  );

  const cartData = await db.cart.create({
    data: {
      ...cartTotals,
      totalProducts: cartProducts.length,
      userId: userId || null,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    include: {
      cartItems: {
        include: { product: true },
      },
    },
  });

  setCookie("cart_data", {
    cartId: cartData.id.toString(),
    secret: cartData.secret,
  });

  return cartData;
};

export const createCartItems = async ({
  cartProducts = [],
  cartId,
}: {
  cartProducts: TCartItemPayload[];
  cartId: number;
}) => {
  const dbProducts = await retreiveProducts(cartProducts);
  const cartItems = dbProducts.map((dbProduct) => {
    return insertCartItemPayload({
      items: cartProducts,
      dbProduct,
      cartId,
    });
  });

  return await db.cartItem.createMany({ data: cartItems });
};
