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

export const setCookie = (key: string, payload: { [key: string]: string }) => {
  const responseCookies = cookies();
  return responseCookies.set(key, JSON.stringify(payload), {
    httpOnly: true,
    path: "/",
  });
};
