"use server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/utils/password";

export async function registerUser({ name, email, password }) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("Email already in use");
  }

  const hashed = await hashPassword(password);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashed,
      role: "USER",
    },
  });

  return { success: true };
}

