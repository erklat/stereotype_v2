"use client";

import { useAppDispatch, useAppSelector } from "@/state-management/hooks";
import { getCartData } from "@/utils/CartManager/CartManager.selectors";

const Page = () => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector(getCartData);

  return (
    <>
      {cartData.cartItems.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>Qty: {item.quantity}</p>
        </div>
      ))}
    </>
  );
};

export default Page;
