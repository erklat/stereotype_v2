"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Svg_component_1 = __importDefault(require("@/components/Svg/Svg.component"));
const classnames_1 = __importDefault(require("classnames"));
const debounce_1 = __importDefault(require("lodash/debounce"));
const SearchBox = ({ onChange, value }) => {
    const [isFocused, setIsFocused] = (0, react_1.useState)(false);
    const [inputValue, setInputValue] = (0, react_1.useState)(value);
    const debouncedOnChange = (0, react_1.useRef)((0, debounce_1.default)(onChange, 300)).current;
    (0, react_1.useEffect)(() => {
        debouncedOnChange(inputValue);
    }, [inputValue, debouncedOnChange]);
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };
    return (<div className="block relative text-slate-700 md:mr-4 md:ml-0 md:my-0">
      <input id="search-input" type="text" onChange={handleChange} className={(0, classnames_1.default)(`block transition-all duration-300 h-8 rounded-full outline-none`, {
            ["w-40 pl-4 pr-9 -indent-0"]: isFocused || !!inputValue,
            ["w-8 p-0 -indent-96"]: !(isFocused || !!inputValue),
        })} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} value={inputValue}/>
      <label htmlFor="search-input" aria-label="What are you looking for">
        <div className="text-white flex justify-center items-center w-8 h-8 mr-0 absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none rounded-full bg-blue-500">
          <Svg_component_1.default icon="search"/>
        </div>
      </label>
    </div>);
};
exports.default = SearchBox;
