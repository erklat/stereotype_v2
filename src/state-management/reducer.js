"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const ProductsManager_reducer_1 = __importDefault(require("@/utils/ProductsManager/ProductsManager.reducer"));
const NotificationManager_reducer_1 = __importDefault(require("@/utils/NotificationManager/NotificationManager.reducer"));
const CartManager_reducer_1 = __importDefault(require("@/utils/CartManager/CartManager.reducer"));
const AuthManager_reducer_1 = __importDefault(require("@/utils/AuthManager/AuthManager.reducer"));
//  Combining all existing reducers
const combinedReducer = (0, redux_1.combineReducers)({
    productsManager: ProductsManager_reducer_1.default,
    notificationManager: NotificationManager_reducer_1.default,
    cartManager: CartManager_reducer_1.default,
    authManager: AuthManager_reducer_1.default,
});
const reducer = (state, action) => {
    return combinedReducer(state, action);
};
exports.default = reducer;
