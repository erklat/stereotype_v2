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
exports.PATCH = PATCH;
const server_1 = require("next/server");
const client_1 = require("@prisma/client");
const utils_1 = require("@/utils/CartManager/utils");
const prisma = new client_1.PrismaClient();
function PATCH(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const payload = yield req.json();
            const { id: cartId, productId } = params;
            const { hashKey, quantity } = payload;
            const existingCart = yield prisma.cart.findUnique({
                where: {
                    id: Number(cartId),
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
            const existingCartItem = existingCart.cartItems.find((item) => item.productId === Number(productId));
            if (!existingCartItem) {
                return server_1.NextResponse.json({ error: "Cart item not found" }, { status: 404 });
            }
            if (quantity === 0) {
                yield prisma.cartItem.delete({
                    where: {
                        cartId_productId: {
                            cartId: Number(cartId),
                            productId: Number(productId),
                        },
                    },
                });
            }
            else {
                yield prisma.cartItem.update({
                    where: {
                        cartId_productId: {
                            cartId: Number(cartId),
                            productId: Number(productId),
                        },
                    },
                    data: {
                        quantity,
                        total: Number(existingCartItem.price) * quantity,
                        discountedTotal: (0, utils_1.calculateDiscountedPrice)(Number(existingCartItem.price), Number(existingCartItem === null || existingCartItem === void 0 ? void 0 : existingCartItem.discountPercentage)) * quantity,
                    },
                });
            }
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
            const response = (0, utils_1.parseCartDataToResponse)(updatedCart);
            return server_1.NextResponse.json({ data: response });
        }
        catch (error) {
            console.error("Error updating cart item quantity:", error);
            return server_1.NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
        }
        finally {
            yield prisma.$disconnect(); // Disconnect Prisma client
        }
    });
}
