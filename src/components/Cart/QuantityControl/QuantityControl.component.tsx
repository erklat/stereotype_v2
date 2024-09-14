import { useAppSelector, useAppDispatch } from "@/state-management/hooks";
import { getCartData } from "@/utils/CartManager/CartManager.selectors";
import { actions as cartActions } from "@/utils/CartManager/CartManager.reducer";
import { Prisma } from "@prisma/client";
import { TProduct } from "@/utils/ProductsManager/types";
import { useGetUserData } from "@/utils/AuthManager/AuthManager.queries";

const QuantityControl = ({ product }: { product: TProduct }) => {
  console.log(product);
  const dispatch = useAppDispatch();
  const cartData = useAppSelector(getCartData);
  const { id: cartId = null } = { ...cartData };
  const productInCart = cartData?.cartItems?.find(
    (item: Prisma.CartItemGetPayload<{}>) => item.productId === product.id
  );
  const { productId = null, quantity: currentQuantity = 0 } = {
    ...productInCart,
  };
  const { data: userData } = useGetUserData();
  const { id: userId } = { ...userData };

  const addToCartAPI = (product: TProduct) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: cartActions.START_ADD_PRODUCT,
        promise: { resolve, reject },
        payload: {
          userId,
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
          <div className="flex justify-between w-full bg-white border border-blue-500 p-1 rounded-3xl items-center">
            <button
              type="button"
              onClick={() => updateProductQuantity(currentQuantity - 1)}
              className="rounded-full w-8 h-8 bg-blue-500 text-white"
            >
              -
            </button>
            <span className="text-slate-500">{productInCart?.quantity}</span>
            <button
              type="button"
              onClick={() => updateProductQuantity(currentQuantity + 1)}
              className="rounded-full w-8 h-8 bg-blue-500 text-white"
            >
              +
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={() => addToCart()}
          className="flex justify-center w-full bg-white border border-blue-500 p-1 rounded-3xl items-center text-slate-500 h-[42px]"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default QuantityControl;
