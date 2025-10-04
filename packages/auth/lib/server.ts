import { betterAuth } from "better-auth";
import { type PrismaConfig, prismaAdapter } from "better-auth/adapters/prisma";
import { anonymous } from "better-auth/plugins";

export { fromNodeHeaders, toNodeHandler } from "better-auth/node";

export const createAuth = (
  prisma: object,
  provider: PrismaConfig["provider"],
  googleClientId: string,
  googleClientSecret: string,
  trustedOrigin: string,
) => {
  return betterAuth({
    database: prismaAdapter(prisma, { provider }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: googleClientId,
        clientSecret: googleClientSecret,
      },
    },
    trustedOrigins: [trustedOrigin],
    plugins: [anonymous()],
  } as const);
};
