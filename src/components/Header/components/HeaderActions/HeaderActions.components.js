"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("next/image"));
const react_1 = require("next-auth/react");
const hooks_1 = require("@/state-management/hooks");
const AuthManager_selectors_1 = require("@/utils/AuthManager/AuthManager.selectors");
const CartManager_selectors_1 = require("@/utils/CartManager/CartManager.selectors");
const Dropdown_component_1 = __importDefault(require("@/components/Dropdown/Dropdown.component"));
const LoginForm_component_1 = __importDefault(require("@/components/LoginForm/LoginForm.component"));
const Svg_component_1 = __importDefault(require("@/components/Svg/Svg.component"));
const Button_component_1 = __importDefault(require("@/components/Button/Button.component"));
const HeaderActions = () => {
    const userData = (0, hooks_1.useAppSelector)(AuthManager_selectors_1.getUserData);
    const cartData = (0, hooks_1.useAppSelector)(CartManager_selectors_1.getCartData);
    const { cartItems = [] } = Object.assign({}, cartData);
    return (<div className="flex gap-4">
      <Dropdown_component_1.default trigger={<Svg_component_1.default icon="user"/>}>
        <div className="w-56">
          {!!userData ? (<div className="text-slate-600">
              <div className="flex flex-col gap-4">
                <span>
                  Dobrodošli {userData.firstName} {userData.lastName}
                </span>
                <Button_component_1.default label="Postavke"/>
                <Button_component_1.default label="Odjava" onClick={() => (0, react_1.signOut)()}/>
              </div>
            </div>) : (<LoginForm_component_1.default />)}
        </div>
      </Dropdown_component_1.default>
      {!!(cartItems === null || cartItems === void 0 ? void 0 : cartItems.length) && (<Dropdown_component_1.default trigger={<Svg_component_1.default icon="cart"/>}>
          <div>
            {cartItems.map((item) => {
                var _a;
                return (<div key={item.productId} className="text-slate-700 flex gap-4 items-center">
                <div>
                  <image_1.default width={40} height={40} src={item.thumbnail} alt={`${item.title} image`}/>
                </div>
                <div className="flex flex-col gap-4">
                  <span>{item.title}</span>
                  <div>
                    {item.price.toFixed(2)} {(_a = item.discountedTotal) === null || _a === void 0 ? void 0 : _a.toFixed(2)}
                  </div>
                </div>
              </div>);
            })}
          </div>
        </Dropdown_component_1.default>)}
    </div>);
};
exports.default = HeaderActions;
