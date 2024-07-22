"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logo_svg_1 = __importDefault(require("/public/assets/svg/logo.svg"));
const user_svg_1 = __importDefault(require("/public/assets/svg/user.svg"));
const cart_svg_1 = __importDefault(require("/public/assets/svg/cart.svg"));
const sort_svg_1 = __importDefault(require("/public/assets/svg/sort.svg"));
const circle_svg_1 = __importDefault(require("/public/assets/svg/circle.svg"));
const circle_checked_svg_1 = __importDefault(require("/public/assets/svg/circle-checked.svg"));
const filter_svg_1 = __importDefault(require("/public/assets/svg/filter.svg"));
const price_svg_1 = __importDefault(require("/public/assets/svg/price.svg"));
const search_svg_1 = __importDefault(require("/public/assets/svg/search.svg"));
const svgManifest = {
    logo: logo_svg_1.default,
    user: user_svg_1.default,
    cart: cart_svg_1.default,
    sort: sort_svg_1.default,
    circle: circle_svg_1.default,
    circleChecked: circle_checked_svg_1.default,
    filter: filter_svg_1.default,
    price: price_svg_1.default,
    search: search_svg_1.default,
};
exports.default = svgManifest;
