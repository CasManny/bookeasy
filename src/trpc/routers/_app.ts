import { authRouter } from "@/features/auth/server/procedures";
import { createTRPCRouter } from "../init";
import { providerRouter } from "@/features/provider/server/procedures";
import { userRouter } from "@/features/user/server/procedures";
export const appRouter = createTRPCRouter({
  auth: authRouter,
  provider: providerRouter,
  user: userRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
