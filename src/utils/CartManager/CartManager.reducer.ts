export const actions = {
  START_ADD_PRODUCT: "START_ADD_PRODUCT",
  ADD_PRODUCT_SUCCESSFUL: "ADD_PRODUCT_SUCCESSFUL",
  ADD_PRODUCT_FAILED: "ADD_PRODUCT_FAILED",

  STORE_PRODUCT_DATA: "STORE_PRODUCT_DATA",
};

const initialState = {
  data: {},
  cartLoading: false,
};

const cartActions = (
  state = initialState,
  { type, response, id, placementKey, storeType = "replace" }
) => {
  switch (type) {
    case actions.START_ADD_PRODUCT: {
      return {
        ...state,
        cartLoading: true,
      };
    }
    case actions.ADD_PRODUCT_SUCCESSFUL:
    case actions.ADD_PRODUCT_FAILED: {
      return {
        ...state,
        cartLoading: false,
      };
    }

    case actions.STORE_PRODUCT_DATA: {
      return {
        ...state,
      };
    }
    default:
      return { ...state };
  }
};

export default cartActions;
