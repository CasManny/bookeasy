import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { ac, admin, user, provider } from "./permissions";

const client = createAuthClient({
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

export const { useSession, signOut } = client;
