import { Prisma } from "@prisma/client";

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

// cartData:
//     | ({
//         cartItems: {
//           id: number;
//           cartId: number;
//           productId: number;
//           title: string;
//           price: Prisma.Decimal;
//           quantity: number;
//           total: Prisma.Decimal;
//           discountPercentage: Prisma.Decimal | null;
//           discountedTotal: Prisma.Decimal | null;
//           thumbnail: string;
//         }[];
//       } & {
//         id: number;
//         userId: number;
//         total: Prisma.Decimal;
//         discountedTotal: Prisma.Decimal;
//         totalProducts: number;
//         totalQuantity: number;
//         hashKey: string;
//         status: string;
//         createdAt: Date;
//         updatedAt: Date;
//         expiresAt: Date;
//       })
//     | null
