"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/state-management/store";
import { actions as authActions } from "@/utils/AuthManager/AuthManager.reducer";
import { Session } from "next-auth";
import { useGetUserData } from "@/utils/AuthManager/AuthManager.queries";

export default function StoreProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const storeRef = useRef<AppStore>();
  const { data: userData, isLoading, error } = useGetUserData();

  console.log("STATE", userData);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();

    if (session?.user) {
      storeRef.current.dispatch({
        type: authActions.STORE_USER_DATA,
        response: session?.user,
      });
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
