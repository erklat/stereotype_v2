"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const client_1 = require("@prisma/client");
const crypto_1 = __importDefault(require("crypto"));
const currency_js_1 = __importDefault(require("currency.js"));
const headers_1 = require("next/headers");
const prisma = new client_1.PrismaClient();
function calculateDiscountedPrice(price, discountPercentage) {
    const discountAmount = (discountPercentage / 100) * price;
    return price - discountAmount;
}
function POST(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = yield req.json();
            const { userId, products } = payload;
            const hashKey = crypto_1.default.randomBytes(20).toString("hex");
            // Calculate totals for the entire cart
            const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
            const discountedTotal = products.reduce((acc, product) => acc +
                calculateDiscountedPrice(product.price, product.discountPercentage) *
                    product.quantity, 0);
            const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
            // Create the cart
            const cart = yield prisma.cart.create({
                data: {
                    userId,
                    total,
                    discountedTotal,
                    totalProducts: products.length,
                    totalQuantity,
                    hashKey,
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                },
            });
            // Map products to cart items
            const cartItems = products.map((product) => ({
                cartId: cart.id,
                productId: product.id,
                title: product.title,
                price: product.price,
                quantity: product.quantity,
                total: product.price * product.quantity,
                discountPercentage: product.discountPercentage,
                discountedTotal: calculateDiscountedPrice(product.price, product.discountPercentage) *
                    product.quantity,
                thumbnail: product.thumbnail,
            }));
            yield prisma.cartItem.createMany({
                data: cartItems,
            });
            // Fetch the complete cart with cart items
            const cartData = yield prisma.cart.findUnique({
                where: { id: cart.id },
                include: { cartItems: true },
            });
            if (!cartData)
                throw new Error("Error retrieving cart from DB.");
            const response = Object.assign(Object.assign({}, cartData), { total: (0, currency_js_1.default)(cartData.total.toNumber()), discountedTotal: (0, currency_js_1.default)(cartData.discountedTotal.toNumber()), cartItems: cartData === null || cartData === void 0 ? void 0 : cartData.cartItems.map((item) => (Object.assign(Object.assign({}, item), { price: (0, currency_js_1.default)(item.price.toNumber()), total: (0, currency_js_1.default)(item.total.toNumber()), discountedTotal: item.discountedTotal
                        ? (0, currency_js_1.default)(item.discountedTotal.toNumber())
                        : 0, discountPercentage: item.discountPercentage
                        ? (0, currency_js_1.default)(item.discountPercentage.toNumber())
                        : 0 }))) });
            // Set cookies
            const responseCookies = (0, headers_1.cookies)();
            responseCookies.set("cart_data", JSON.stringify({
                cartId: cart.id,
                userId,
                hashKey,
            }), {
                httpOnly: true,
                path: "/",
            });
            return server_1.NextResponse.json({ data: response });
        }
        catch (error) {
            return server_1.NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 405 });
        }
        finally {
            yield prisma.$disconnect(); // Disconnect Prisma client
        }
    });
}
