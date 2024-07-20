import { all } from "redux-saga/effects";
import productsManagerSaga from "@/utils/ProductsManager/ProductsManager.saga";
import cartManagerSaga from "@/utils/CartManager/CartManager.saga";
import authManagerSaga from "@/utils/AuthManager/AuthManager.saga";

export default function* rootSaga() {
  yield all([...productsManagerSaga]);
  yield all([...cartManagerSaga]);
  yield all([...authManagerSaga]);
}
