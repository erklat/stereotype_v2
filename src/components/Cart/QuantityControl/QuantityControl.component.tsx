import { useAppSelector, useAppDispatch } from "@/state-management/hooks";
import { getCartData } from "@/utils/CartManager/CartManager.selectors";
import { actions as cartActions } from "@/utils/CartManager/CartManager.reducer";
import { Prisma } from "@prisma/client";
import { TProduct } from "@/utils/ProductsManager/types";

const QuantityControl = ({ product }: { product: TProduct }) => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector(getCartData);
  const { id: cartId = null } = { ...cartData };
  const productInCart = cartData?.cartItems?.find(
    (item: Prisma.CartItemGetPayload<{}>) => item.productId === product.id
  );
  const { productId = null, quantity: currentQuantity = 0 } = {
    ...productInCart,
  };

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

  const addToCart = () => {
    addToCartAPI(product)
      .then(() => {})
      .catch(() => {});
  };

  const updateProductQuantityAPI = (quantity: number) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: cartActions.START_UPDATE_PRODUCT_QUANTITY,
        promise: { resolve, reject },
        payload: {
          cartId,
          productId,
          quantity,
        },
      });
    });
  };

  const updateProductQuantity = (quantity: number) => {
    updateProductQuantityAPI(quantity)
      .then(() => {})
      .catch(() => {});
  };

  return (
    <div className={`flex`}>
      {productInCart ? (
        <>
          <button
            type="button"
            onClick={() => updateProductQuantity(currentQuantity - 1)}
          >
            -
          </button>
          {/* <input type="number" onChange={() => onQuantityChange()} /> */}
          <button
            type="button"
            onClick={() => updateProductQuantity(currentQuantity + 1)}
          >
            +
          </button>
        </>
      ) : (
        <button type="button" onClick={() => addToCart()}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default QuantityControl;
