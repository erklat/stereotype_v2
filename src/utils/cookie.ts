"use server";

import { cookies } from "next/headers";

export const getAllCookies = async () => {
  return cookies().getAll();
};

export const getCookie = async (key: string) => {
  const cookie = await cookies().get(key);

  return cookie ? JSON.parse(cookie.value) : null;
};

export const deleteCookie = async (name: string) => {
  cookies().delete(name);
};

export const getCookieValue = (cookie: string | null, key: string) =>
  cookie
    ?.split("; ")
    ?.find((c: string) => c.startsWith(`${key}=`))
    ?.split("=")[1] ?? null;
