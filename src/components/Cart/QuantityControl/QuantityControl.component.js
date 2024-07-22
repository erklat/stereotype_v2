"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("@/state-management/hooks");
const CartManager_selectors_1 = require("@/utils/CartManager/CartManager.selectors");
const CartManager_reducer_1 = require("@/utils/CartManager/CartManager.reducer");
const QuantityControl = ({ product }) => {
    var _a;
    const dispatch = (0, hooks_1.useAppDispatch)();
    const cartData = (0, hooks_1.useAppSelector)(CartManager_selectors_1.getCartData);
    const { id: cartId = null } = Object.assign({}, cartData);
    const productInCart = (_a = cartData === null || cartData === void 0 ? void 0 : cartData.cartItems) === null || _a === void 0 ? void 0 : _a.find((item) => item.productId === product.id);
    const { productId = null, quantity: currentQuantity = 0 } = Object.assign({}, productInCart);
    const addToCartAPI = (product) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: CartManager_reducer_1.actions.START_ADD_PRODUCT,
                promise: { resolve, reject },
                payload: {
                    userId: 1,
                    // TODO: leave as an array in case of bulk add
                    products: [Object.assign(Object.assign({}, product), { quantity: 1 })],
                },
            });
        });
    };
    const addToCart = () => {
        addToCartAPI(product)
            .then(() => { })
            .catch(() => { });
    };
    const updateProductQuantityAPI = (quantity) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: CartManager_reducer_1.actions.START_UPDATE_PRODUCT_QUANTITY,
                promise: { resolve, reject },
                payload: {
                    cartId,
                    productId,
                    quantity,
                },
            });
        });
    };
    const updateProductQuantity = (quantity) => {
        updateProductQuantityAPI(quantity)
            .then(() => { })
            .catch(() => { });
    };
    return (<div className={`flex`}>
      {productInCart ? (<>
          <button type="button" onClick={() => updateProductQuantity(currentQuantity - 1)}>
            -
          </button>
          {/* <input type="number" onChange={() => onQuantityChange()} /> */}
          <button type="button" onClick={() => updateProductQuantity(currentQuantity + 1)}>
            +
          </button>
        </>) : (<button type="button" onClick={() => addToCart()}>
          Add to Cart
        </button>)}
    </div>);
};
exports.default = QuantityControl;
