import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Define routes using regex-like patterns for flexibility
const protectedRoutes = [/^\/services/, /^\/dashboard/, /^\/my-bookings/];
const authRoutes = [/^\/login$/, /^\/sign-up$/];

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = getSessionCookie(request);
  const isLoggedIn = Boolean(session);
  const path = nextUrl.pathname;

  // Helper: check if current path matches any route pattern
  const matches = (routes: RegExp[]) => routes.some((r) => r.test(path));

  const isProtected = matches(protectedRoutes);
  const isAuth = matches(authRoutes);

  // Redirect unauthenticated users trying to access protected routes
  if (isProtected && !isLoggedIn) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("from", path); // optional — for redirect back later
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect logged-in users away from login/signup
  if (isAuth && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match everything except Next.js internals and static assets
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ico|woff2?|ttf|webmanifest)).*)',
    // Always run for API and TRPC routes
    '/(api|trpc)(.*)',
  ],
};
