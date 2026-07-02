"use server";
import { db } from "@/db";
import { admins } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  verifyPassword,
  createToken,
  setAuthCookie,
  clearAuthCookie,
  getAuthFromCookie,
} from "@/lib/auth";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const password = formData.get("password") as string;
  if (!password) return { error: "Password required" };

  try {
    const admin = await db.select().from(admins).limit(1);
    if (admin.length === 0) return { error: "Admin not set up" };

    const valid = await verifyPassword(password, admin[0].passwordHash);
    if (!valid) return { error: "Invalid password" };

    const token = await createToken();
    await setAuthCookie(token);
  } catch (e: any) {
    return { error: e.message || "Login failed" };
  }

  redirect("/dashboard");
}

export async function logout() {
  await clearAuthCookie();
  redirect("/login");
}

export async function checkSession() {
  return !!(await getAuthFromCookie());
}