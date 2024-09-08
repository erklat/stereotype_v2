import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { queryClient } from "@/utils/query/QueryProvider";
import { useGetUserData } from "./AuthManager.queries";

type Props = {
  children: React.ReactNode;
};

export default async function AuthProvider({ children }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: useGetUserData,
  });

  return <HydrationBoundary>{children}</HydrationBoundary>;
}
