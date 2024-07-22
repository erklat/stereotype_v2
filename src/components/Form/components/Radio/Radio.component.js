"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Svg_component_1 = __importDefault(require("@/components/Svg/Svg.component"));
const Radio = ({ checked, option, onChange }) => {
    return (<div className="flex items-center space-x-2">
      <label className="flex items-center cursor-pointer" htmlFor={`radio_${option.value}`}>
        <input id={`radio_${option.value}`} type="radio" name="sort" checked={checked} onChange={onChange} value={option.value} className="hidden" aria-label={option.label}/>

        {!checked ? <Svg_component_1.default icon="circle"/> : <Svg_component_1.default icon="circleChecked"/>}

        <span className="ml-2">{option.label}</span>
      </label>
    </div>);
};
exports.default = Radio;
