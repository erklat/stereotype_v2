import { useAppSelector, useAppDispatch } from "@/state-management/hooks";
import {
  getCartData,
  getProduct,
} from "@/utils/CartManager/CartManager.selectors";
import { actions as cartActions } from "@/utils/CartManager/CartManager.reducer";

const QuantityControl = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector(getCartData);
  const { id: cartId } = { ...cartData };
  const productInCart = cartData?.cartItems?.find(
    (item) => item.productId === product.id
  );
  const { productId, quantity: currentQuantity } = { ...productInCart };

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

  const addToCart = () => {
    addToCartAPI(product)
      .then(() => {})
      .catch(() => {});
  };

  const increaseQuantityAPI = () => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: cartActions.START_ADD_PRODUCT,
        promise: { resolve, reject },
        payload: {
          userId: 1,
          // TODO: leave as an array in case of bulk add
          products: [{ ...product, quantity: product.quantity + 1 }],
        },
      });
    });
  };

  const updateProductQuantityAPI = (quantity) => {
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

  const decreaseQuantity = () => {};

  const onQuantityChange = () => {};

  const updateProductQuantity = (quantity) => {
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
          <input type="number" onChange={() => onQuantityChange()} />
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
