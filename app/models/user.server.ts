import type { Password, User } from "@prisma/client";
import argon2 from "@node-rs/argon2";
import { prisma } from "~/.server/db";

export type { User };

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"],
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: { password: true },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await argon2.verify(userWithPassword.password.hash, password);

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
