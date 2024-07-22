"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Svg_component_1 = __importDefault(require("@/components/Svg/Svg.component"));
const Logo = () => {
    return (<h1>
      <Svg_component_1.default icon="logo"/>
    </h1>);
};
exports.default = Logo;
