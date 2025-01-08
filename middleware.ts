
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes
const publicRoutes = [
  '/',
  '/events/:id',
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing'
];

// Define ignored routes (no authentication info)
const ignoredRoutes = [
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing'
];

// Create a matcher for public routes
const isPublicRoute = createRouteMatcher(publicRoutes);

// Create a matcher for ignored routes
const isIgnoredRoute = createRouteMatcher(ignoredRoutes);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    // No action needed for public routes
    return NextResponse.next();
  }

  if (isIgnoredRoute(req)) {
    // No authentication info for ignored routes
    return NextResponse.next();
  }

  // Protect all other routes
  await auth.protect();
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};