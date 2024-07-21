export const getCartData = (state) => {
  if (!Object.keys(state?.cartManager?.data).length) return null;

  return state?.cartManager?.data;
};

export const getProduct = (state, productId) => {
  const cartData = getCartData(state);

  if (!cartData?.cartItems?.length) return null;

  return cartData.cartItems.find((item) => item.id === productId);
};
