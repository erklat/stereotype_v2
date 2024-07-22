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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const server_1 = require("next/server");
const client_1 = require("@prisma/client");
const actions_1 = require("@/utils/actions");
const utils_1 = require("@/utils/CartManager/utils");
const prisma = new client_1.PrismaClient();
function GET(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cookie = yield (0, actions_1.getCookie)("cart_data");
            const { userId, hashKey } = cookie;
            if (!userId || !hashKey) {
                return server_1.NextResponse.json({ error: "Missing userId or hashKey" }, { status: 400 });
            }
            // Find the active cart for the user
            const now = new Date();
            const activeCart = yield prisma.cart.findFirst({
                where: {
                    userId: parseInt(userId),
                    hashKey,
                    status: "active",
                    expiresAt: {
                        gt: now,
                    },
                },
                include: {
                    cartItems: true,
                },
            });
            // If no active cart found, return 404 error
            if (!activeCart) {
                return server_1.NextResponse.json({ error: "No active cart found for the user" }, { status: 404 });
            }
            // Update carts that have expired to abandoned status
            if (activeCart.expiresAt <= now) {
                yield prisma.cart.update({
                    where: { id: activeCart.id },
                    data: { status: "abandoned" },
                });
            }
            // Prepare response
            const response = Object.assign(Object.assign({}, activeCart), { total: activeCart.total.toNumber(), discountedTotal: activeCart.discountedTotal.toNumber(), cartItems: activeCart.cartItems.map((item) => {
                    var _a, _b;
                    return (Object.assign(Object.assign({}, item), { price: item.price.toNumber(), total: item.total.toNumber(), discountedTotal: ((_a = item === null || item === void 0 ? void 0 : item.discountedTotal) === null || _a === void 0 ? void 0 : _a.toNumber()) || 0, discountPercentage: ((_b = item === null || item === void 0 ? void 0 : item.discountPercentage) === null || _b === void 0 ? void 0 : _b.toNumber()) || 0 }));
                }) });
            return server_1.NextResponse.json({ data: response });
        }
        catch (error) {
            console.error(error);
            return server_1.NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
        }
        finally {
            yield prisma.$disconnect(); // Disconnect Prisma client
        }
    });
}
function POST(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const payload = yield req.json();
            const { id } = params;
            const cartId = Number(id);
            const { userId, hashKey, products: newProducts } = payload;
            const existingCart = yield prisma.cart.findUnique({
                where: {
                    id: Number(cartId),
                    userId: parseInt(userId),
                    hashKey,
                    status: "active",
                    expiresAt: {
                        gt: new Date(),
                    },
                },
                include: {
                    cartItems: true,
                },
            });
            if (!existingCart) {
                return server_1.NextResponse.json({ error: "No active cart found for the user" }, { status: 404 });
            }
            const updateCart = () => __awaiter(this, void 0, void 0, function* () {
                yield Promise.all(newProducts.map((product) => __awaiter(this, void 0, void 0, function* () {
                    yield prisma.cartItem.upsert({
                        where: {
                            cartId_productId: {
                                cartId: Number(cartId),
                                productId: product.id,
                            },
                        },
                        update: {
                            quantity: product.quantity,
                            total: product.price * product.quantity,
                            discountedTotal: (0, utils_1.calculateDiscountedPrice)(product.price, product.discountPercentage) * product.quantity,
                        },
                        create: {
                            cartId: Number(cartId),
                            productId: product.id,
                            title: product.title,
                            price: product.price,
                            quantity: product.quantity,
                            total: product.price * product.quantity,
                            discountPercentage: product.discountPercentage,
                            discountedTotal: (0, utils_1.calculateDiscountedPrice)(product.price, product.discountPercentage) * product.quantity,
                            thumbnail: product.thumbnail,
                        },
                    });
                })));
                yield prisma.cart.update({
                    where: {
                        id: existingCart.id,
                    },
                    data: {
                        updatedAt: new Date(Date.now()),
                        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    },
                });
                // Fetch and return the updated cart data
                const updatedCart = yield prisma.cart.findUnique({
                    where: { id: existingCart.id },
                    include: {
                        cartItems: true,
                    },
                });
                return updatedCart;
            });
            const cartData = yield updateCart();
            const response = (0, utils_1.parseCartDataToResponse)(cartData);
            return server_1.NextResponse.json({ data: response });
        }
        catch (error) {
            console.error("Error updating cart:", error);
            return server_1.NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
        }
        finally {
            yield prisma.$disconnect(); // Disconnect Prisma client
        }
    });
}
