"use strict";
"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const svgManifest_1 = __importDefault(require("./svgManifest"));
const Svg = (0, react_1.forwardRef)((_a, ref) => {
    var { icon, classNames, wrapperClassNames } = _a, otherProps = __rest(_a, ["icon", "classNames", "wrapperClassNames"]);
    const SVG = svgManifest_1.default === null || svgManifest_1.default === void 0 ? void 0 : svgManifest_1.default[icon];
    if (!SVG)
        return null;
    return (<span ref={ref} className={wrapperClassNames}>
        <SVG className={classNames} {...otherProps} aria-hidden="true"/>
      </span>);
});
Svg.displayName = "Svg";
exports.default = Svg;
