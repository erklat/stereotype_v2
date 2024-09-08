import { getUser } from "@/utils/AuthManager/actions";

export const useGetUserData = async () => {
  const res = await getUser();
  const data = await res;

  console.log("useGetUserData, ", data);

  return data;
};
