"use server";
import TLoginData from "@/utils/AuthManager/types";

export async function login(data: TLoginData) {
  // we're gonna put a delay in here to simulate some kind of data processing like persisting data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("server action", data);

  return {
    status: "success",
    message: `Welcome`,
  };
}
