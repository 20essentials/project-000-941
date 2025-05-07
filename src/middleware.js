import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';

const isProtectedRouter = createRouteMatcher(['/votes']);

export const onRequest = clerkMiddleware((auth, context) => {
  const { userId, redirectToSignIn } = auth();
  if (isProtectedRouter(context.request) && !userId) {
    return redirectToSignIn();
  }
});
