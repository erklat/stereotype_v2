"use server";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash } from "crypto";

import { lucia } from "@/utils/AuthManager/auth";
import db from "@/utils/db";

type LoginRequestErrors = {};

export async function login(_prevState, formData: FormData) {
  // const validatedFields = schema.safeParse({
  //   email: formData.get("email"),
  //   password: formData.get("password"),
  // });

  // if (!validatedFields.success) {
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //   };
  // }

  const password = createHash("md5")
    .update(formData.get("password"))
    .digest("hex");

  console.log(formData);

  const user = await db.user.findFirst({
    where: {
      email: formData.get("email"),
      password,
    },
  });

  console.log(user);

  if (!user) {
    return {
      errors: {
        password: ["Neispravna lozinka."],
      },
    };
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  // if (user.role === "SUPERADMIN") {
  //   redirect("/superadmin/partneri");
  // }

  // if (user.role === "ADMIN") {
  //   redirect("/admin");
  // }

  redirect("/");
}

export const getUser = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;
  const { user, session } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }

  const userDb = await db.user.findFirstOrThrow({
    where: {
      id: user.id,
    },
    include: {},
  });

  return { ...user, ...userDb };
});
