// @ts-nocheck

import { takeLatest, put, call, select } from "redux-saga/effects";

import { localRestClient } from "@/api/restClient";

import { actions as cartActions } from "@/utils/CartManager/CartManager.reducer";
// import { notify } from "@/utils/NotificationManager/NotificationManager";
import { deleteCookie, getCookie } from "@/utils/actions";
import { getCartData } from "@/utils/CartManager/CartManager.selectors";

/**
 * Add product to cart
 * @param  {Object} promise Promises
 * @param  params {object}
 * @return {Object} Response from API
 */
export function* addProduct({ promise, payload }) {
  try {
    const state = yield select();
    const { products, userId } = payload;
    const cartData = getCartData(state);
    const response = yield localRestClient.post(
      !cartData ? `/cart` : `/cart/${cartData.id}`,
      {
        userId,
        products,
      }
    );
    const { data } = response;

    yield put({
      type: cartActions.ADD_PRODUCT_SUCCESSFUL,
    });

    yield put({
      type: cartActions.STORE_CART_DATA,
      response: data.data,
    });

    yield call(promise.resolve, data);
  } catch (error) {
    yield put({
      type: cartActions.ADD_PRODUCT_FAILED,
    });

    yield call(promise.reject, error);
  }
}

/**
 * Fetch cart
 * @param  {Object} promise Promises
 * @return {Object} Response from API
 */
export function* fetchCart({ promise }) {
  try {
    const cookie = yield getCookie("cart_data");
    if (!cookie) throw new Error();

    const { cartId, userId, hashKey } = cookie;

    const response = yield localRestClient.get(`/cart/${cartId}`, {
      params: {
        hashKey,
        userId,
      },
    });

    yield put({
      type: cartActions.FETCHING_CART_SUCCESSFUL,
    });

    yield put({
      type: cartActions.STORE_CART_DATA,
      response: response.data.data,
    });

    yield call(promise.resolve, response.data);
  } catch (error) {
    yield put({
      type: cartActions.FETCHING_CART_FAILED,
    });

    yield deleteCookie("cart_data");

    yield call(promise.reject, error);
  }
}

/**
 * Update cart
 * @param  {Object} promise Promises
 * @param  params {object}
 * @return {Object} Response from API
 */
export function* updateCart({ promise, payload }) {
  try {
    const state = yield select();
    const { products, userId } = payload;
    const cartData = getCartData(state);
    const response = yield localRestClient.post(`/cart/${cartData.id}`);

    yield put({
      type: cartActions.UPDATE_CART_SUCCESSFUL,
    });

    yield put({
      type: cartActions.STORE_CART_DATA,
      response,
    });

    yield call(promise.resolve, response.data);
  } catch (error) {
    yield put({
      type: cartActions.UPDATE_CART_FAILED,
    });

    yield call(promise.reject, error);
  }
}

/**
 * Update product quantity on separate endpoint
 * @param  {Object} promise Promises
 * @param  params {object}
 * @return {Object} Response from API
 */
export function* updateProductQuantity({ promise, payload }) {
  try {
    const { cartId, productId, quantity } = payload;
    const response = yield localRestClient.patch(
      `/cart/${cartId}/items/${productId}`,
      {
        quantity,
      }
    );

    yield put({
      type: cartActions.UPDATE_PRODUCT_QUANTITY_SUCCESSFUL,
    });

    yield put({
      type: cartActions.STORE_CART_DATA,
      response: response.data.data,
    });

    yield call(promise.resolve, response.data);
  } catch (error) {
    yield put({
      type: cartActions.UPDATE_PRODUCT_QUANTITY_FAILED,
    });

    yield call(promise.reject, error);
  }
}

const actions = [
  takeLatest(cartActions.START_ADD_PRODUCT, addProduct),
  takeLatest(cartActions.START_FETCHING_CART, fetchCart),
  takeLatest(cartActions.START_UPDATE_CART, updateCart),
  takeLatest(cartActions.START_UPDATE_PRODUCT_QUANTITY, updateProductQuantity),
];

/**
 * Register action to watcher
 */
export default actions;
