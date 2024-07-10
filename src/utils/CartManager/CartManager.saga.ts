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
    const { product, userId } = payload;
    const response = yield localRestClient.post(`/api/cart`, {
      userId,
      product,
    });
    const { data } = response;

    console.log(data);

    yield put({
      type: cartActions.ADD_PRODUCT_SUCCESSFUL,
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

const actions = [takeLatest(cartActions.START_ADD_PRODUCT, addProduct)];

/**
 * Register action to watcher
 */
export default actions;
