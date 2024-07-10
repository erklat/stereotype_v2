import {
  takeLatest,
  put,
  call,
  select,
  cancelled,
  fork,
  take,
} from "redux-saga/effects";
import { channel } from "redux-saga";

import restClient from "@/api/restClient";

import { actions as productActions } from "@/utils/ProductsManager/ProductsManager.reducer";
import { notify } from "@/utils/NotificationManager/NotificationManager";

/**
 * Fetch Products
 * @param  {Object} promise Promises
 * @param  placementKey {string|number}
 * @param  storeType {string} replace|append
 * @param  params {object}
 * @param  ignoreDefaultParams {boolean}
 * @param  ignoreLocationParams {boolean}
 * @return {Object} Response from API
 */
export function* fetchProducts({
  promise,
  placementKey,
  storeType,
  params = null,
  ignoreDefaultParams = false,
  ignoreLocationParams = false,
}) {
  try {
    const response = yield restClient.get(`/products`, {
      params: { ...params, limit: 0 },
    });

    yield put({
      type: productActions.FETCHING_PRODUCTS_SUCCESSFUL,
    });

    const { data } = response;
    const { products: productsData, ...productsMeta } = data;

    yield put({
      type: productActions.STORE_PRODUCTS_DATA,
      response: {
        data: productsData,
        meta: productsMeta,
      },
    });

    yield call(promise.resolve, response.data);
  } catch (error) {
    yield put({
      type: productActions.FETCHING_PRODUCTS_FAILED,
    });

    yield call(promise.reject, error);
  }
}

export function* fetchCategories({ promise }) {
  try {
    const response = yield restClient.get(`/products/categories`);
    const { data } = response;

    yield put({
      type: productActions.FETCHING_CATEGORIES_SUCCESSFUL,
    });

    yield put({
      type: productActions.STORE_CATEGORIES_DATA,
      response: data,
    });

    yield call(promise.resolve, data);
  } catch (error) {
    yield put({
      type: productActions.FETCHING_CATEGORIES_FAILED,
    });

    yield put(
      notify({
        type: "error",
        title: "Error fetching categories",
        message: "custom message",
        identifier: `categories.fetching_categories_failed`,
      })
    );

    yield call(promise.reject, error);
  }
}

export function* fetchCategoryProducts({ promise, params }) {
  try {
    const { category } = params;
    const response = yield restClient.get(`/products/category/${category}`);

    yield put({
      type: productActions.FETCHING_CATEGORY_PRODUCTS_SUCCESSFUL,
    });

    const { data } = response;
    const { products: responseData, ...responseMeta } = data;

    yield put({
      type: productActions.STORE_CATEGORY_PRODUCTS_DATA,
      response: {
        category,
        data: {
          data: responseData,
          meta: responseMeta,
        },
      },
    });

    yield call(promise.resolve, data);
  } catch (error) {
    yield put({
      type: productActions.FETCHING_CATEGORY_PRODUCTS_FAILED,
    });

    yield call(promise.reject, error);
  }
}

const actions = [
  takeLatest(productActions.START_FETCHING_PRODUCTS, fetchProducts),
  takeLatest(productActions.START_FETCHING_CATEGORIES, fetchCategories),
  takeLatest(
    productActions.START_FETCHING_CATEGORY_PRODUCTS,
    fetchCategoryProducts
  ),
];

/**
 * Register action to watcher
 */
export default actions;
