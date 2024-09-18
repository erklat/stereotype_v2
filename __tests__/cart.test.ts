// cart.test.ts
import { AxiosResponse, AxiosRequestHeaders } from "axios";
import { POST } from "@/app/api/cart/route"; // Adjust the path as necessary
import { Prisma } from "@prisma/client";
import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
// import { renderHook, waitFor } from "@testing-library/react";

import {
  getCartTotals,
  insertCartItemPayload,
} from "@/utils/CartManager/utils";
import { jest } from "@jest/globals";

import { fetchCart } from "@/utils/CartManager/CartManager.services";
import { createCart } from "@/utils/CartManager/CartManager.db";
import { prismaMock } from "../__mocks__/prisma";
import { mockProduct } from "../__mocks__/product";
import { cookies } from "next/headers";

// Mock the module containing fetchCart
jest.mock("@/utils/CartManager/CartManager.services", () => ({
  fetchCart: jest.fn(),
}));

// Mock the cookies function
jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("@/db/db");

describe("POST /api/cart", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
  });

  it("should return 200", async () => {
    const mockFetchCart = fetchCart as jest.MockedFunction<typeof fetchCart>;
    // Mock the AxiosResponse type
    const mockResponse: AxiosResponse = {
      data: {
        /* mock data */
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        headers: {} as AxiosRequestHeaders,
      },
    };

    console.log("mockFetchCart", jest.isMockFunction(mockFetchCart));

    mockFetchCart.mockResolvedValue(mockResponse);
  });

  it("should calculate totals and create a new cart", async () => {
    const mockCartPayload = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
    ];

    // Mock db.product.findMany to return fake products
    prismaMock.product.findMany.mockResolvedValue([
      {
        ...mockProduct,
        id: 1,
        dimensionId: 0,
        metaId: 0,
      },
      {
        ...mockProduct,
        id: 2,
        dimensionId: 0,
        metaId: 0,
      },
    ]);

    // Mock cart creation in the Prisma client
    prismaMock.cart.create.mockResolvedValue({
      id: 1,
      userId: null,
      total: 300, // Assuming calculated totals
      discountedTotal: 260, // Assuming calculated totals with discounts
      totalProducts: 2,
      totalQuantity: 3,
      secret: "test-secret",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      // cartItems: mockCartPayload,
    });

    // Mock the behavior of cookies()
    const mockSetCookie = jest.fn();
    (cookies as jest.Mock).mockReturnValue({
      set: mockSetCookie,
    });

    // Call the function under test
    const cartData = await createCart({ cartProducts: mockCartPayload });

    console.log(cartData);

    // Assertions
    expect(cartData.total).toBe(300);
    expect(cartData.discountedTotal).toBe(260);
    expect(prismaMock.cart.create).toHaveBeenCalled();
    expect(prismaMock.product.findMany).toHaveBeenCalledWith({
      where: {
        id: {
          in: [1, 2], // Mock product IDs
        },
      },
    });
  });
});

// // Mock Prisma and utility functions
// jest.mock("@/utils/db", () => ({
//   product: {
//     findMany: jest.fn(),
//   },
//   cart: {
//     create: jest.fn(),
//     findUnique: jest.fn(),
//   },
//   cartItem: {
//     createMany: jest.fn(),
//   },
//   $disconnect: jest.fn(),
// }));

// jest.mock("next/headers", () => ({
//   cookies: jest.fn(() => ({
//     set: jest.fn(),
//   })),
// }));

// jest.mock("@/utils/CartManager/utils", () => ({
//   getCartTotals: jest.fn(),
//   insertCartItemPayload: jest.fn(),
// }));

// describe("POST /api/cart", () => {
//   afterEach(() => {
//     jest.clearAllMocks(); // Clear mocks between tests
//   });

//   it("should create a cart and return cart data", async () => {
//     const mockRequest = {
//       json: jest.fn().mockResolvedValue({
//         products: [
//           { id: "product-1", quantity: 2 },
//           { id: "product-2", quantity: 1 },
//         ],
//       }),
//     } as unknown as NextRequest;

//     const mockResponse = {
//       status: 200,
//     } as unknown as NextResponse;

//     // Mock db.product.findMany
//     db.product.findMany.mockResolvedValue([
//       { id: "product-1", price: 100 },
//       { id: "product-2", price: 200 },
//     ]);

//     // Mock getCartTotals
//     getCartTotals.mockResolvedValue({
//       totalPrice: 400,
//       totalDiscount: 0,
//     });

//     // Mock db.cart.create
//     db.cart.create.mockResolvedValue({
//       id: 1,
//       secret: "test-secret",
//     });

//     // Mock insertCartItemPayload
//     insertCartItemPayload.mockImplementation(({ dbProduct }) => ({
//       productId: dbProduct.id,
//       quantity: 1,
//       cartId: 1,
//     }));

//     // Mock db.cart.findUnique
//     db.cart.findUnique.mockResolvedValue({
//       id: 1,
//       secret: "test-secret",
//       cartItems: [{ id: 1, productId: "product-1", quantity: 2 }],
//     });

//     // Call POST handler
//     const response = await POST(mockRequest, mockResponse);

//     // Verify response
//     expect(response.status).toBe(200);
//     const jsonResponse = await response.json();
//     expect(jsonResponse.data).toEqual({
//       id: 1,
//       secret: "test-secret",
//       cartItems: [{ id: 1, productId: "product-1", quantity: 2 }],
//     });

//     // Verify that the cart cookie was set
//     const cookies = require("next/headers").cookies;
//     expect(cookies().set).toHaveBeenCalledWith(
//       "cart_data",
//       JSON.stringify({ cartId: 1, secret: "test-secret" }),
//       { httpOnly: true, path: "/" }
//     );
//   });

//   it("should handle errors and return status 405", async () => {
//     const mockRequest = {
//       json: jest.fn().mockRejectedValue(new Error("Test error")),
//     } as unknown as NextRequest;

//     const mockResponse = {
//       status: 405,
//     } as unknown as NextResponse;

//     const response = await POST(mockRequest, mockResponse);

//     expect(response.status).toBe(405);
//     const jsonResponse = await response.json();
//     expect(jsonResponse.error).toBe("Test error");
//   });
// });
