import { anonymousClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string;
  }
}

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  plugins: [anonymousClient()],
});

export type { Session, User } from "better-auth";
export type { BetterFetchError } from "better-auth/react";
