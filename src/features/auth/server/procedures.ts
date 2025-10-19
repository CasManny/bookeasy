/* eslint-disable @typescript-eslint/no-explicit-any */
import { availabilities, dayOfWeek, user } from "@/db/schema";
import { db } from "@/index";
import { auth, ErrorCode } from "@/lib/auth";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { APIError } from "better-auth/api";
import { eq } from "drizzle-orm";
import z from "zod";

const daysOfWeek: (typeof dayOfWeek.enumValues)[number][] = [
  "mon",
  "tue",
  "wed",
  "thurs",
  "fri",
  "sat",
  "sun",
];

export const authRouter = createTRPCRouter({
  createAccount: baseProcedure
    .input(
      z.object({
        fullName: z.string(),
        email: z.email(),
        role: z.enum(["user", "provider"]),
        password: z.string().min(6, "Password must be at least 6 characters"),
      })
    )
    .mutation(async ({ input }) => {
      const { email, fullName, password, role } = input;

      try {
        await db.transaction(async (tx) => {
          const newUser = await auth.api.createUser({
            body: {
              email,
              password,
              name: fullName,
              role,
            },
          });

          if (!newUser?.user?.id) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "User creation failed unexpectedly.",
            });
          }

          //  Create provider availabilities
          if (role === "provider") {
            await tx.insert(availabilities).values(
              daysOfWeek.map((day) => ({
                userId: newUser.user.id,
                dayOfWeek: day,
                isAvailable: true,
              }))
            );
          }

          return newUser;
        });

        return {
          success: true,
          message: "Account created successfully",
        };
      } catch (error) {
        if (error instanceof APIError) {
          const errCode = error?.body
            ? (error.body.code as ErrorCode)
            : "UNKNOWN";
          switch (errCode) {
            case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "An account with this email already exists.",
              });
          }
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal server error",
        });
      }
    }),

  loginToAccount: baseProcedure
    .input(
      z.object({
        email: z.email(),
        password: z.string().min(1, "Password is required"),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;

      try {
        // Call Better Auth API to sign in user

        const { user: data } = await auth.api.signInEmail({
          body: { email, password },
        });

        if (!data) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid email or password.",
          });
        }

        const [userRole] = await db
          .select({
            role: user.role,
          })
          .from(user)
          .where(eq(user.id, data.id));

        // Return both user and session
        return {
          success: true,
          message: "Login successful.",
          data,
          role: userRole,
        };
      } catch (error: any) {
        console.error("Error logging in:", error);

        if (error instanceof APIError) {
          const errCode = error?.body
            ? (error.body.code as ErrorCode)
            : "UNKNOWN";

          switch (errCode) {
            case "INVALID_EMAIL_OR_PASSWORD":
              throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "Incorrect email or password.",
              });
          }
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while logging in.",
          cause: error,
        });
      }
    }),
});
