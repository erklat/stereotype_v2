import db from "@/db/db";
import { getCookie } from "@/utils/actions";
import { has } from "lodash";

export const mergeUserCarts = async (userId) => {
  const cookie = await getCookie("cart_data");
  const { hashKey } = { ...cookie };
  // once user logs on merge carts
  let tempCart = null;
  const existingCart = await db.cart.findFirst({
    where: {
      userId,
      status: "active",
    },
    include: {
      cartItems: true,
    },
  });

  if (hashKey) {
    tempCart = await db.findFirst({
      where: {
        hashKey,
        status: "active",
      },
      include: {
        cartItems: true,
      },
    });
  }

  console.log("existingCart,", existingCart);
  console.log("tempCart,", tempCart);

  if (existingCart && tempCart) {
    console.log("exists");
  }
};
