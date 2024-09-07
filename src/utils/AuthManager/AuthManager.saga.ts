// @ts-nocheck

import { takeLatest, put, call } from "redux-saga/effects";
import { signIn, getSession } from "next-auth/react";

import { actions as authActions } from "@/utils/AuthManager/AuthManager.reducer";
// TODO: implement notifications
// import { notify } from "@/utils/NotificationManager/NotificationManager";

/**
 * Fetch Products
 * @param  {Object} promise Promises
 * @param  params {object}
 * @return {Object} Response from API
 */
export function* startLogin({ promise, payload }) {
  try {
    const { formData } = payload;
    const response = yield call(signIn, "credentials", {
      redirect: false,
      ...formData,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    // Fetch the session to get the user data
    const session = yield call(getSession);

    if (!session) {
      throw new Error("Failed to fetch user session");
    }

    const { user, accessToken } = session;

    yield put({
      type: authActions.USER_LOGIN_SUCCESSFUL,
    });

    // Store user data in Redux state
    yield put({
      type: authActions.STORE_USER_DATA,
      response: user,
    });

    // Resolve the promise with the user data
    yield call(promise.resolve, { user, accessToken });
  } catch (error) {
    yield put({
      type: authActions.USER_LOGIN_FAILED,
      payload: error.message,
    });

    // Reject the promise with the error
    yield call(promise.reject, error);
  }
}

const actions = [takeLatest(authActions.START_USER_LOGIN, startLogin)];

/**
 * Register action to watcher
 */
export default actions;
