"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const hooks_1 = require("@/state-management/hooks");
const CartManager_reducer_1 = require("@/utils/CartManager/CartManager.reducer");
const QuantityControl_component_1 = __importDefault(require("@/components/Cart/QuantityControl/QuantityControl.component"));
const image_1 = __importDefault(require("next/image"));
const ProductCard = ({ product }) => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const { id, title, thumbnail, brand, price, discount } = product;
    const discountedPrice = discount
        ? (price - (price * discount) / 100).toFixed(2)
        : price.toFixed(2);
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
    const addToCart = (product) => {
        addToCartAPI(product)
            .then(() => { })
            .catch(() => { });
    };
    return (<div id={id.toString()} className="border rounded-lg p-4 shadow-md" aria-labelledby={`product-title-${id}`} aria-describedby={`product-description-${id}`}>
      <image_1.default src={thumbnail} alt={`${title} thumbnail`} className="w-full h-48 object-cover rounded" aria-labelledby={`product-image-${id}`}/>
      <h2 id={`product-title-${id}`} className="mt-4 text-lg font-bold">
        {title}
      </h2>
      <p id={`product-description-${id}`} className="text-sm text-gray-600">
        {brand}
      </p>
      <div className="mt-2">
        {discount ? (<>
            <span className="line-through text-gray-500">
              ${price.toFixed(2)}
            </span>
            <span className="ml-2 text-red-500">${discountedPrice}</span>
          </>) : (<span>${price.toFixed(2)}</span>)}
      </div>
      <div className="mt-2">
        <QuantityControl_component_1.default product={product}/>
        {/* <Button label="Add to Cart" onClick={() => addToCart(product)} /> */}
      </div>
    </div>);
};
exports.default = ProductCard;
