"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/state-management/hooks";
import { actions as productActions } from "@/utils/ProductsManager/ProductsManager.reducer";
import Filters from "@/components/Filters/Filters.component";
import Products from "@/components/Products/Products.component";
import { actions as cartActions } from "@/utils/CartManager/CartManager.reducer";

export default function Home() {
  const dispatch = useAppDispatch();

  const fetchProductsAPI = useCallback(() => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: productActions.START_FETCHING_PRODUCTS,
        promise: { resolve, reject },
      });
    });
  }, [dispatch]);

  const fetchCategoriesAPI = useCallback(() => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: productActions.START_FETCHING_CATEGORIES,
        promise: { resolve, reject },
      });
    });
  }, [dispatch]);

  const fetchCartAPI = useCallback(() => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: cartActions.START_FETCHING_CART,
        promise: { resolve, reject },
      });
    });
  }, [dispatch]);

  useEffect(() => {
    fetchProductsAPI().catch(() => {});
    fetchCategoriesAPI().catch(() => {});
    fetchCartAPI().catch(() => {});
  }, [fetchProductsAPI, fetchCategoriesAPI, fetchCartAPI]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-10">
      <Filters />

      <Products />
    </main>
  );
}
