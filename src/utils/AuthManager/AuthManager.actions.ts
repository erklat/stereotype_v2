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

export async function logout() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    // This does nothing as far as I can tell.
    // Maybe return void here.
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(sessionId);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect("/login");
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);

    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }

      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}

    return result;
  }
);

export const getUser = async () => {
  const { session } = await validateRequest();

  if (!session) return null;

  const user = await db.user.findFirstOrThrow({
    where: {
      id: session?.userId,
    },
    include: {},
  });

  return user;
};
