import { Prisma } from "@prisma/client";

export type TCartItemPayload = {
  quantity: number;
  id: number;
};

export type TCartData = {
  id: number;
  userId: number;
  total: Prisma.Decimal;
  discountedTotal: Prisma.Decimal;
  totalProducts: number;
  totalQuantity: number;
  hashKey: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  cartItems: Prisma.CartItemGetPayload<{}>;
} | null;
