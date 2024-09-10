import {
  getUser,
  login,
  logout,
} from "@/utils/AuthManager/AuthManager.actions";
import queryClient from "@/utils/query/getQueryClient";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useUserLogin = (formData) => {
  // use mutation
  const mutation = useMutation({
    mutationKey: ["user"],
    mutationFn: () => login(null, formData),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
};

export const storeUserData = (user) => queryClient.setQueryData(["user"], user);

export function useUserLogout() {
  // use mutation
  const mutation = useMutation({
    mutationKey: ["user"],
    mutationFn: logout,
    onSuccess: () => {
      storeUserData(null);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
}

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
