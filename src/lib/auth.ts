import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin as adminPlugin } from "better-auth/plugins";
import { db } from "..";
import { ac, admin, provider, user } from "./permissions";
import * as schema from '@/db/schema'

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  user: {
    additionalFields: {
      role: {
        type: ["user", "provider", "admin"],
      },
    },
  },

  plugins: [
    nextCookies(),
    adminPlugin({
      ac,
      roles: {
        admin,
        user,
        provider,
      },
    }),
  ],
});

export type ErrorCode =
  | keyof typeof auth.$ERROR_CODES
  | "UNKNOWN"
  | "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL";
