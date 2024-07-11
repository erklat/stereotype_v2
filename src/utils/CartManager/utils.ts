import currency from "currency.js";

export const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number
): number => {
  const discountAmount = (discountPercentage / 100) * price;
  return price - discountAmount;
};

export const getCartTotal = (products) => {
  const result = products.reduce(
    (acc: number, product: any) => acc + product.price * product.quantity,
    0
  );

  return currency(result);
};

export const getDiscountedTotal = (products) => {
  const result = products.reduce(
    (acc: number, product: any) =>
      acc +
      calculateDiscountedPrice(product.price, product.discountPercentage) *
        product.quantity,
    0
  );

  return currency(result);
};

export const parseCartDataToResponse = (cartData) => {
  const products = cartData.cartItems;

  return {
    ...cartData,
    total: getCartTotal(products),
    discountedTotal: getDiscountedTotal(products),
    cartItems: products.map((product) => ({
      ...product,
      price: currency(product.price.toNumber()),
      total: currency(product.total.toNumber() * product.quantity),
      discountedTotal: currency(
        product.discountedTotal?.toNumber() * product.quantity
      ),
      discountPercentage: currency(product.discountPercentage?.toNumber()),
    })),
  };
};
