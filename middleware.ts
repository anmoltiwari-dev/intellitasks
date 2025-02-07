import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware(async (auth, request) => {
  const authObject = await auth();

  if (isPublicRoute(request) && authObject.userId) {
    if (authObject.orgId) {
      const organizationPathWithSlug = `/organization/${authObject.orgId}`;
      return NextResponse.redirect(new URL(organizationPathWithSlug, request.url));
    } else if (request.nextUrl.pathname === 'select-org') {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/select-org', request.url));
    }
  }

  if (!isPublicRoute(request) && !authObject.userId) {
    authObject.redirectToSignIn({ returnBackUrl: request.url });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};