import restClient from "@/api/restClient";
import { DefinedInitialDataOptions } from "@tanstack/react-query";

export const getProductsAPI = async (params?: any) => {
  const res = await restClient.get(`/products`, {
    params: { ...params, limit: 0 },
  });
  const data = await res?.data;

  return data;
};
