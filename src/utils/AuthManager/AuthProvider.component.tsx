import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "@/utils/query/getQueryClient";
import { useGetUserData } from "./AuthManager.queries";

type Props = {
  children: React.ReactNode;
};

export default async function AuthProvider({ children }: Props) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: useGetUserData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
