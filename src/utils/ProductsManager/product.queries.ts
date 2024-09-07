import { useQuery } from "@tanstack/react-query";
import { getProductsAPI } from "@/utils/ProductsManager/product.api";

export const getProducts = useQuery({
  queryKey: ["products"],
  queryFn: getProductsAPI,
});
