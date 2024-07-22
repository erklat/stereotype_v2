// @ts-nocheck

import { combineReducers } from "redux";

import productsManager from "@/utils/ProductsManager/ProductsManager.reducer";
import notificationManager from "@/utils/NotificationManager/NotificationManager.reducer";
import cartManager from "@/utils/CartManager/CartManager.reducer";
import authManager from "@/utils/AuthManager/AuthManager.reducer";

//  Combining all existing reducers
const combinedReducer = combineReducers({
  productsManager,
  notificationManager,
  cartManager,
  authManager,
});

const reducer = (state, action) => {
  return combinedReducer(state, action);
};

export default reducer;
