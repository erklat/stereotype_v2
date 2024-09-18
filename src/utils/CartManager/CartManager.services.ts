import { localRestClient } from "@/api/restClient";
import { getCookie } from "@/utils/cookie";

export const fetchCart = async () => {
  const cookie = await getCookie("cart_data");
  const { cartId, secret } = cookie;

  return await localRestClient.get(`/cart/${cartId}`, {
    params: {
      secret,
    },
  });
};
