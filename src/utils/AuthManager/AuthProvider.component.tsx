import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import queryClient from "@/utils/query/getQueryClient";
import { getUser } from "./AuthManager.actions";

type Props = {
  children: React.ReactNode;
};

export default async function AuthProvider({ children }: Props) {
  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
