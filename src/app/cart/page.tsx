"use client";

import { useAppSelector } from "@/state-management/hooks";
import { getCartData } from "@/utils/CartManager/CartManager.selectors";
import { Prisma } from "@prisma/client";

const Page = () => {
  const cartData = useAppSelector(getCartData);

  return (
    <>
      {cartData.cartItems.map((item: Prisma.CartItemGetPayload<{}>) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>Qty: {item.quantity}</p>
        </div>
      ))}
    </>
  );
};

export default Page;
