"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = rootSaga;
const effects_1 = require("redux-saga/effects");
const ProductsManager_saga_1 = __importDefault(require("@/utils/ProductsManager/ProductsManager.saga"));
const CartManager_saga_1 = __importDefault(require("@/utils/CartManager/CartManager.saga"));
const AuthManager_saga_1 = __importDefault(require("@/utils/AuthManager/AuthManager.saga"));
function* rootSaga() {
    yield (0, effects_1.all)([...ProductsManager_saga_1.default]);
    yield (0, effects_1.all)([...CartManager_saga_1.default]);
    yield (0, effects_1.all)([...AuthManager_saga_1.default]);
}
