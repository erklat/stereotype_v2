"use client";

import Image from "next/image";

import { signOut } from "next-auth/react";
import { useAppSelector } from "@/state-management/hooks";
import { getUserData } from "@/utils/AuthManager/AuthManager.selectors";
import { getCartData } from "@/utils/CartManager/CartManager.selectors";
import { getProductsData } from "@/utils/ProductsManager/ProductsManager.selectors";
import Dropdown, {
  Orientation,
} from "@/components/Dropdown/Dropdown.component";
import LoginForm from "@/components/LoginForm/LoginForm.component";
import Svg from "@/components/Svg/Svg.component";
import Button from "@/components/Button/Button.component";
import { Prisma } from "@prisma/client";
import QuantityControl from "@/components/Cart/QuantityControl/QuantityControl.component";
import { TProduct } from "@/utils/ProductsManager/types";
import { useGetUserData } from "@/utils/AuthManager/AuthManager.queries";
import { useQuery } from "@tanstack/react-query";

const HeaderActions = () => {
  // const userData = getUser();
  const cartData = useAppSelector(getCartData);
  const { cartItems = [] } = { ...cartData };
  const productsData = useAppSelector(getProductsData);

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => useGetUserData(),
  });

  const userData = data;

  console.log("header: ", userData);

  return (
    <div className="flex gap-4">
      <Dropdown trigger={<Svg icon="user" />} orientation={Orientation.Right}>
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
        <Dropdown trigger={<Svg icon="cart" />} orientation={Orientation.Right}>
          <div className="w-64 flex flex-col gap-4">
            {cartItems.map((item: Prisma.CartItemGetPayload<{}>) => (
              <div
                key={item.productId}
                className="text-slate-700 flex gap-4 items-center border-b border-b-slate-500 pb-4"
              >
                <div>
                  <Image
                    width={40}
                    height={40}
                    src={item.thumbnail}
                    alt={`${item.title} image`}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <span>{item.title}</span>
                  <div className="flex">
                    <div className="flex flex-col">
                      <s className="text-red-500">${item.price.toFixed(2)}</s> $
                      {item.discountedTotal?.toFixed(2)}
                    </div>
                  </div>

                  <QuantityControl
                    product={productsData?.find(
                      (p: TProduct) => p.id === item.productId
                    )}
                  />
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
