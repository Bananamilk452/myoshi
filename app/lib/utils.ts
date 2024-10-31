import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useMatches } from "@remix-run/react";
import { useMemo } from "react";
import { z } from "zod";

import type { UserWithAvatar } from "~/models/user.server";

const DEFAULT_REDIRECT = "/";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT,
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string,
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id],
  );
  return route?.data as Record<string, unknown>;
}

const userSchema = z.object({
  email: z.string(),
  username: z.string().nullable(),
  avatar: z
    .object({
      url: z.string(),
    })
    .nullable(),
});

function isUser(user: unknown): user is UserWithAvatar {
  /*
    User: {
      email: string,
      username: string | null,
      avatar: {
        url: string,
      } | null,
    }
  */

  return userSchema.safeParse(user).success;
}

export function useOptionalUser(): UserWithAvatar | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser(): UserWithAvatar {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.",
    );
  }
  return maybeUser;
}
