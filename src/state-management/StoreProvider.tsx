"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/state-management/store";
import { useSession } from "next-auth/react";
import { actions as authActions } from "@/utils/AuthManager/AuthManager.reducer";

export default function StoreProvider({
  children,
  session,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();

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
