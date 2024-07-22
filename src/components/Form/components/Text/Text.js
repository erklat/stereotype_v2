"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const debounce_1 = __importDefault(require("lodash/debounce"));
const Input_1 = __importDefault(require("@/components/Form/components/Input/Input"));
const Text = (0, react_1.forwardRef)((props, ref) => {
    var _a;
    const [focused, setFocused] = (0, react_1.useState)(false);
    const { label, name, onChange, value, onBlur, getFieldState } = Object.assign({}, props);
    const { error } = Object.assign({}, getFieldState(name));
    const errorMessage = (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "";
    return (<Input_1.default htmlAttrs={{ name, label }} fieldActive={!!focused || !!value} error={errorMessage}>
        <input ref={ref} name={name} type="text" onChange={(0, debounce_1.default)(onChange, 500)} onFocus={() => setFocused(true)} onBlur={() => {
            setFocused(false);
            onBlur();
        }} className={`
            px-4
            py-3
            w-full
            h-full
            outline-none
        `}/>
      </Input_1.default>);
});
Text.displayName = "Text";
exports.default = Text;
