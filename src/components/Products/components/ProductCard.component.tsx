import React from "react";
import { useAppDispatch } from "@/state-management/hooks";
import { actions as cartActions } from "@/utils/CartManager/CartManager.reducer";

import QuantityControl from "@/components/Cart/QuantityControl/QuantityControl.component";
import { TProduct } from "@/utils/ProductsManager/types";
import Image from "next/image";
import Svg from "@/components/Svg/Svg.component";

const ProductCard = ({
  product,
  onViewProduct,
}: {
  product: TProduct;
  onViewProduct: () => void;
}) => {
  const dispatch = useAppDispatch();

  const { id, title, thumbnail, brand, price, discount } = product;
  const discountedPrice = discount
    ? (price - (price * discount) / 100).toFixed(2)
    : price.toFixed(2);

  const addToCartAPI = (product: TProduct) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: cartActions.START_ADD_PRODUCT,
        promise: { resolve, reject },
        payload: {
          userId: 1,
          // TODO: leave as an array in case of bulk add
          products: [{ ...product, quantity: 1 }],
        },
      });
    });
  };

  const addToCart = (product: TProduct) => {
    addToCartAPI(product)
      .then(() => {})
      .catch(() => {});
  };

  return (
    <div
      id={id.toString()}
      className="border rounded-lg p-4 shadow-md h-full flex flex-col"
      aria-labelledby={`product-title-${id}`}
      aria-describedby={`product-description-${id}`}
    >
      <Image
        width={300}
        height={300}
        src={thumbnail}
        alt={`${title} thumbnail`}
        className="w-full h-48 object-cover rounded"
        aria-labelledby={`product-image-${id}`}
      />
      <h2 id={`product-title-${id}`} className="mt-4 text-lg font-bold">
        {title}
      </h2>
      <div className="flex flex-col justify-between grow">
        <div>
          <p id={`product-description-${id}`} className="text-sm text-gray-600">
            {brand}
          </p>
          <div className="mt-2">
            {discount ? (
              <>
                <span className="line-through text-gray-500">
                  ${price.toFixed(2)}
                </span>
                <span className="ml-2 text-red-500">${discountedPrice}</span>
              </>
            ) : (
              <span>${price.toFixed(2)}</span>
            )}
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          <div className="grow">
            <QuantityControl product={product} />
          </div>
          <button type="button" onClick={onViewProduct}>
            <Svg icon="search" />
          </button>
          {/* <Button label="Add to Cart" onClick={() => addToCart(product)} /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
