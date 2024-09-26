import currency from "currency.js";
import { Prisma } from "@prisma/client";
import { TCartData, TCartItemPayload } from "@/utils/CartManager/types";
import db from "@/db/db";

export function calculateDiscountedPrice(
  price: number,
  discountPercentage: number | null
): number {
  if (!discountPercentage) return price;

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

export const getCartTotals = async (cartProducts: TCartItemPayload[]) => {
  console.log("cartProducts, ", cartProducts);
  const dbProducts = await db.product.findMany({
    where: {
      id: {
        in: cartProducts.map((product) => product.id),
      },
    },
  });

  console.log("dbProducts, ", dbProducts);

  const total = cartProducts.reduce((acc, product) => {
    const price = dbProducts.find(
      (dbProduct) => dbProduct.id === product.id
    )?.price;

    if (!price) return acc;

    return acc + price * product.quantity;
  }, 0);

  const discountedTotal = cartProducts.reduce((acc, product) => {
    const result = dbProducts.find((dbProduct) => dbProduct.id === product.id);
    const price = result?.price;
    const discountPercentage = result?.discountPercentage;

    if (!price || !discountPercentage) return acc;

    return (
      acc +
      calculateDiscountedPrice(price, discountPercentage) * product.quantity
    );
  }, 0);

  const totalQuantity = cartProducts.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  return { total, discountedTotal, totalQuantity };
};

export const insertCartItemPayload = ({
  items,
  dbProduct,
  cartId,
}: {
  items: TCartItemPayload[];
  dbProduct: Prisma.ProductGetPayload<{}>;
  cartId: number;
}) => {
  const quantity =
    items.find((product: TCartItemPayload) => product.id === dbProduct.id)
      ?.quantity ?? 1;

  return {
    cartId,
    productId: dbProduct.id,
    title: dbProduct.title,
    price: dbProduct.price,
    quantity,
    total: dbProduct.price * quantity,
    discountPercentage: dbProduct.discountPercentage,
    discountedTotal:
      calculateDiscountedPrice(dbProduct.price, dbProduct.discountPercentage) *
      quantity,
    thumbnail: dbProduct.thumbnail,
  };
};
