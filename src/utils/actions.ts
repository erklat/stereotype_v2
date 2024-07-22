"use server";

import { cookies } from "next/headers";

export const getAllCookies = async () => {
  return cookies().getAll();
};

export const getCookie = async (key) => {
  const cookie = await cookies().get(key);

  return cookie ? JSON.parse(cookie.value) : null;
};
