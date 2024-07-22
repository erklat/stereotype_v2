"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("@/state-management/hooks");
const CartManager_selectors_1 = require("@/utils/CartManager/CartManager.selectors");
const Page = () => {
    const cartData = (0, hooks_1.useAppSelector)(CartManager_selectors_1.getCartData);
    return (<>
      {cartData.cartItems.map((item) => (<div key={item.id}>
          <h3>{item.title}</h3>
          <p>Qty: {item.quantity}</p>
        </div>))}
    </>);
};
exports.default = Page;
