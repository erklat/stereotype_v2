import currency from "currency.js";
import { Prisma } from "@prisma/client";
import { TCartData } from "@/utils/CartManager/types";

export const calculateDiscountedPrice = (
  price: number,
  discountPercentage?: number
): number => {
  const discountAmount = discountPercentage
    ? (discountPercentage / 100) * price
    : price;
  return price - discountAmount;
};

export const getCartTotal = (products: Prisma.CartItemGetPayload<{}>[]) => {
  const result = products.reduce(
    (acc: number, product: any) => acc + product.price * product.quantity,
    0
  );

  return currency(result);
};

export const getDiscountedTotal = (
  products: Prisma.CartItemGetPayload<{}>[]
) => {
  const result = products.reduce(
    (acc: number, product: any) =>
      acc +
      calculateDiscountedPrice(product.price, product.discountPercentage) *
        product.quantity,
    0
  );

  return currency(result);
};

export const parseCartDataToResponse = (
  cartData: Prisma.CartGetPayload<{
    include: {
      cartItems: true;
    };
  }> | null
) => {
  const products = cartData?.cartItems || [];

  return {
    ...cartData,
    total: getCartTotal(products),
    discountedTotal: getDiscountedTotal(products),
    cartItems: products.map((product: Prisma.CartItemGetPayload<{}>) => ({
      ...product,
      price: currency(product.price.toNumber()),
      total: currency(product.total.toNumber() * product.quantity),
      discountedTotal: currency(
        product?.discountedTotal?.toNumber() || 0 * product.quantity
      ),
      discountPercentage: product.discountPercentage
        ? currency(product.discountPercentage?.toNumber())
        : 0,
    })),
  };
};
