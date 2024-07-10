export const actions = {
  START_FETCHING_PRODUCTS: "START_FETCHING_PRODUCTS",
  FETCHING_PRODUCTS_SUCCESSFUL: "FETCHING_PRODUCTS_SUCCESSFUL",
  FETCHING_PRODUCTS_FAILED: "FETCHING_PRODUCTS_FAILED",

  STORE_PRODUCTS_DATA: "STORE_PRODUCTS_DATA",

  START_FETCHING_CATEGORIES: "START_FETCHING_CATEGORIES",
  FETCHING_CATEGORIES_SUCCESSFUL: "FETCHING_CATEGORIES_SUCCESSFUL",
  FETCHING_CATEGORIES_FAILED: "FETCHING_CATEGORIES_FAILED",

  STORE_CATEGORIES_DATA: "STORE_CATEGORIES_DATA",

  START_FETCHING_CATEGORY_PRODUCTS: "START_FETCHING_CATEGORY_PRODUCTS",
  FETCHING_CATEGORY_PRODUCTS_SUCCESSFUL:
    "FETCHING_CATEGORY_PRODUCTS_SUCCESSFUL",
  FETCHING_CATEGORY_PRODUCTS_FAILED: "FETCHING_CATEGORY_PRODUCTS_FAILED",

  STORE_CATEGORY_PRODUCTS_DATA: "STORE_CATEGORY_PRODUCTS_DATA",

  STORE_PRODUCT_FILTERS: "STORE_PRODUCT_FILTERS",
};

const defaultParams = {
  perPage: 20,
  sortBy: "title",
  sortDirection: "asc",
  priceRange: [],
  category: "",
  currentPage: 1,
  q: "",
};

export const initialState = {
  products: {
    data: [],
    meta: {},
  },
  categories: [],
  productsFetching: false,
  categoriesFetching: false,
  productsByCategory: {},
  queryParams: defaultParams,
};

const productActions = (
  state = initialState,
  { type, response, id, placementKey, storeType = "replace" }
) => {
  switch (type) {
    case actions.START_FETCHING_PRODUCTS: {
      return {
        ...state,
        fetchingProducts: true,
        // fetchingProductsDetailed: {
        //   ...state?.fetchingProductsDetailed,
        //   [placementKey || "unknown"]: {
        //     status: true,
        //     storeType,
        //   },
        // },
      };
    }

    case actions.FETCHING_PRODUCTS_SUCCESSFUL:
    case actions.FETCHING_PRODUCTS_FAILED: {
      return {
        ...state,
        fetchingProducts: false,
      };
    }

    case actions.STORE_PRODUCTS_DATA: {
      return {
        ...state,
        products: response,
      };
    }

    case actions.START_FETCHING_CATEGORIES: {
      return { ...state, fetchingCategories: true };
    }

    case actions.FETCHING_CATEGORIES_SUCCESSFUL:
    case actions.FETCHING_CATEGORIES_FAILED: {
      return { ...state, fetchingCategories: false };
    }

    case actions.STORE_CATEGORIES_DATA: {
      return { ...state, categories: response };
    }

    case actions.START_FETCHING_CATEGORY_PRODUCTS: {
      return { ...state, fetchingProducts: true };
    }
    case actions.FETCHING_CATEGORY_PRODUCTS_SUCCESSFUL:
    case actions.FETCHING_CATEGORY_PRODUCTS_FAILED: {
      return {
        ...state,
        fetchingProducts: false,
      };
    }

    case actions.STORE_CATEGORY_PRODUCTS_DATA: {
      return {
        ...state,
        productsByCategory: {
          ...state.productsByCategory,
          [response.category]: response.data,
        },
      };
    }

    case actions.STORE_PRODUCT_FILTERS: {
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          ...response,
          // [response.key]: response.data,
        },
      };
    }

    // END:SINGLE
    default: {
      return state;
    }
  }
};

export default productActions;
