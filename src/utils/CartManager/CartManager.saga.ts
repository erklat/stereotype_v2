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

import restClient, { localRestClient } from "@/api/restClient";

import { actions as productActions } from "@/utils/ProductsManager/ProductsManager.reducer";
import { actions as cartActions } from "@/utils/CartManager/CartManager.reducer";
import { notify } from "@/utils/NotificationManager/NotificationManager";
// import { getCookie } from "@/utils/cookie";
import { getCookie } from "../actions";
import { getCartData } from "@/utils/CartManager/CartManager.selectors";

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
export function* addProduct({ promise, payload }) {
  console.log("payload", payload);
  try {
    const state = yield select();
    const { products, userId } = payload;
    const cartData = getCartData(state);
    console.log("cartData", cartData);
    const response = yield localRestClient.post(
      !cartData ? `/cart` : `/cart/${cartData.id}`,
      {
        userId,
        products,
      }
    );
    const { data } = response;

    console.log(data);

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

    console.log(error);

    yield call(promise.reject, error);
  }
}

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

    yield call(promise.reject, error);
  }
}

const actions = [
  takeLatest(cartActions.START_ADD_PRODUCT, addProduct),
  takeLatest(cartActions.START_FETCHING_CART, fetchCart),
];

/**
 * Register action to watcher
 */
export default actions;
