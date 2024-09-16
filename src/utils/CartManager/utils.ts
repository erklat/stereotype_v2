import currency from "currency.js";
import { Prisma } from "@prisma/client";
import { TCartData } from "@/utils/CartManager/types";
import db from "@/utils/db";

export function calculateDiscountedPrice(
  price: number,
  discountPercentage: number
): number {
  const percent = discountPercentage / 100;
  const discountAmount = (percent / 100) * price;
  return price - discountAmount;
}

export const getCartTotal = (products: Prisma.CartItemGetPayload<{}>[]) => {
  const result = products.reduce(
    (acc: number, product: any) => acc + product.price * product.quantity,
    0
  );

  return currency(result);
};

export const validateCartItemQuantity = (cartItem, quantity) => {
  // const productId = await db.findUnique(cart)
  // const
};

export const getCartTotals = async (cartProducts) => {
  const dbProducts = await db.product.findMany({
    where: {
      id: {
        in: cartProducts.map((product) => product.productId),
      },
    },
  });

  console.log(">>>>>>>");
  console.log(cartProducts);
  console.log("++++++");
  console.log(dbProducts);

  const total = cartProducts.reduce((acc, product) => {
    const { price } = dbProducts.find(
      (dbProduct) => dbProduct.id === product.productId
    );
    return acc + price * product.quantity;
  }, 0);

  const discountedTotal = cartProducts.reduce((acc, product) => {
    const { price, discountPercentage } = dbProducts.find(
      (dbProduct) => dbProduct.id === product.productId
    );

    return (
      acc +
      calculateDiscountedPrice(price, discountPercentage) * product.quantity
    );
  }, 0);

  const totalQuantity = cartProducts.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  console.log({ total, discountedTotal, totalQuantity });

  return { total, discountedTotal, totalQuantity };
};
