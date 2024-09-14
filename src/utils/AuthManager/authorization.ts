"use server";

import { redirect } from "next/navigation";
import { validateRequest } from "@/utils/AuthManager/auth";
import { User } from "lucia";
import { Role } from "@/utils/db";

export async function onlySuperadmin(): Promise<User | never> {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "SUPERADMIN") {
    redirect("/forbidden");
  }

  return user;
}

export async function onlyAdmin(): Promise<User | never> {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  if (
    ![Role.ADMIN.toString(), Role.SUPERADMIN.toString()].includes(user.role)
  ) {
    redirect("/forbidden");
  }

  return user;
}

export async function onlyUser(): Promise<User | never> {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  return user;
}
