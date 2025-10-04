import { anonymousClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:4000",
  plugins: [anonymousClient()],
});

export type { Session, User } from "better-auth";
export type { BetterFetchError } from "better-auth/react";
