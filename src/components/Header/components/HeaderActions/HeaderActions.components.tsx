"use client";

import Image from "next/image";

import { signOut } from "next-auth/react";
import { useAppSelector } from "@/state-management/hooks";
import { getUserData } from "@/utils/AuthManager/AuthManager.selectors";
import { getCartData } from "@/utils/CartManager/CartManager.selectors";
import Dropdown from "@/components/Dropdown/Dropdown.component";
import LoginForm from "@/components/LoginForm/LoginForm.component";
import Svg from "@/components/Svg/Svg.component";
import Button from "@/components/Button/Button.component";
import { Prisma } from "@prisma/client";

const HeaderActions = () => {
  const userData = useAppSelector(getUserData);
  const cartData = useAppSelector(getCartData);
  const { cartItems = [] } = { ...cartData };

  return (
    <div className="flex gap-4">
      <Dropdown trigger={<Svg icon="user" />}>
        <div className="w-56">
          {!!userData ? (
            <div className="text-slate-600">
              <div className="flex flex-col gap-4">
                <span>
                  Dobrodošli {userData.firstName} {userData.lastName}
                </span>
                <Button label="Postavke" />
                <Button label="Odjava" onClick={() => signOut()} />
              </div>
            </div>
          ) : (
            <LoginForm />
          )}
        </div>
      </Dropdown>
      {!!cartItems?.length && (
        <Dropdown trigger={<Svg icon="cart" />}>
          <div>
            {cartItems.map((item: Prisma.CartItemGetPayload<{}>) => (
              <div
                key={item.productId}
                className="text-slate-700 flex gap-4 items-center"
              >
                <div>
                  <Image
                    width={40}
                    height={40}
                    src={item.thumbnail}
                    alt={`${item.title} image`}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <span>{item.title}</span>
                  <div>
                    {item.price.toFixed(2)} {item.discountedTotal?.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Dropdown>
      )}
    </div>
  );
};

export default HeaderActions;
