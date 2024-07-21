import React from "react";
import { useAppDispatch } from "@/state-management/hooks";
import { actions as cartActions } from "@/utils/CartManager/CartManager.reducer";

import Button from "@/components/Button/Button.component";

import QuantityControl from "@/components/Cart/QuantityControl/QuantityControl.component";

interface ProductCardProps {
  id: string;
  title: string;
  thumbnail: string;
  brand: string;
  price: number;
  discount?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  console.log(">>>>", product);

  const { id, title, thumbnail, brand, price, discount } = product;
  const discountedPrice = discount
    ? (price - (price * discount) / 100).toFixed(2)
    : price.toFixed(2);

  const addToCartAPI = (product) => {
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

  const addToCart = (product) => {
    addToCartAPI(product)
      .then(() => {})
      .catch(() => {});
  };

  return (
    <div
      id={id}
      className="border rounded-lg p-4 shadow-md"
      aria-labelledby={`product-title-${id}`}
      aria-describedby={`product-description-${id}`}
    >
      <img
        src={thumbnail}
        alt={`${title} thumbnail`}
        className="w-full h-48 object-cover rounded"
        aria-labelledby={`product-image-${id}`}
      />
      <h2 id={`product-title-${id}`} className="mt-4 text-lg font-bold">
        {title}
      </h2>
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
      <div className="mt-2">
        <QuantityControl product={product} />
        {/* <Button label="Add to Cart" onClick={() => addToCart(product)} /> */}
      </div>
    </div>
  );
};

export default ProductCard;
