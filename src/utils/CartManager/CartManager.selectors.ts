export const getCartData = (state) => {
  if (!Object.keys(state?.cartManager?.data)) return null;

  return state?.cartManager?.data;
};
