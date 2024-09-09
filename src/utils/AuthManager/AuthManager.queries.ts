import { getUser } from "@/utils/AuthManager/AuthManager.actions";
import queryClient from "@/utils/query/getQueryClient";
import { useQuery } from "@tanstack/react-query";

export const useGetUserData = () => {
  const { data, isLoading, error } = useQuery(
    {
      queryKey: ["user"],
      queryFn: getUser,
    },
    queryClient
  );
  return { data, isLoading, error };
};
