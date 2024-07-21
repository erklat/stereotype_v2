"use server";

import { cookies } from "next/headers";

export const getAllCookies = async () => {
  console.log(await cookies().getAll());
  return cookies().getAll();
};

export const getCookie = async (key) => {
  const cookie = await cookies().get(key);

  return cookie ? JSON.parse(cookie.value) : null;
};
