// @ts-nocheck

export const actions = {
  START_ADD_PRODUCT: "START_ADD_PRODUCT",
  ADD_PRODUCT_SUCCESSFUL: "ADD_PRODUCT_SUCCESSFUL",
  ADD_PRODUCT_FAILED: "ADD_PRODUCT_FAILED",

  START_FETCHING_CART: "START_FETCHING_CART",
  FETCHING_CART_SUCCESSFUL: "FETCHING_CART_SUCCESSFUL",
  FETCHING_CART_FAILED: "FETCHING_CART_FAILED",

  START_UPDATE_CART: "START_UPDATE_CART",
  UPDATE_CART_SUCCESSFUL: "UPDATE_CART_SUCCESSFUL",
  UPDATE_CART_FAILED: "UPDATE_CART_FAILED",

  START_UPDATE_PRODUCT_QUANTITY: "START_UPDATE_PRODUCT_QUANTTITY",
  UPDATE_PRODUCT_QUANTITY_SUCCESSFUL: "UPDATE_PRODUCT_QUANTITY_SUCCESSFUL",
  UPDATE_PRODUCT_QUANTITY_FAILED: "UPDATE_PRODUCT_QUANTITY_FAILED",

  STORE_CART_DATA: "STORE_CART_DATA",
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

    case actions.START_FETCHING_CART: {
      return {
        ...state,
        cartLoading: true,
      };
    }
    case actions.FETCHING_CART_SUCCESSFUL:
    case actions.FETCHING_CART_FAILED: {
      return {
        ...state,
        cartLoading: false,
      };
    }

    case actions.START_UPDATE_CART: {
      return {
        ...state,
        cartLoading: true,
      };
    }
    case actions.UPDATE_CART_SUCCESSFUL:
    case actions.UPDATE_CART_FAILED: {
      return {
        ...state,
        cartLoading: false,
      };
    }

    case actions.START_UPDATE_PRODUCT_QUANTITY: {
      return {
        ...state,
        cartLoading: true,
      };
    }

    case actions.UPDATE_PRODUCT_QUANTITY_SUCCESSFUL:
    case actions.UPDATE_PRODUCT_QUANTITY_FAILED: {
      return {
        ...state,
        cartLoading: false,
      };
    }

    case actions.STORE_CART_DATA: {
      return {
        ...state,
        data: { ...response },
        cartExists: !!Object.keys(response).length,
      };
    }
    default:
      return { ...state };
  }
};

export default cartActions;
