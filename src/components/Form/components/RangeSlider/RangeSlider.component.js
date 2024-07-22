"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Slider_1 = __importDefault(require("@mui/material/Slider"));
const RangeSlider = ({ min, max, onChange, value }) => {
    const handleChange = (_event, newValue) => {
        onChange(newValue);
    };
    return (<Slider_1.default min={min} max={max} value={value} onChange={handleChange} valueLabelDisplay="auto"/>);
};
exports.default = RangeSlider;
