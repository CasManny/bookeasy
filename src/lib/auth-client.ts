import { createAuthClient } from "better-auth/client";
import { adminClient } from "better-auth/client/plugins";
import { ac, admin, user, provider } from "./permissions";

export const client = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        user,
        provider,
      },
    }),
  ],
});
