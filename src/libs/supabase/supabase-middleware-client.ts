// Ref: https://supabase.com/docs/guides/auth/server-side/nextjs

import { type NextRequest,NextResponse } from 'next/server';

import { getApplicationStatus } from '@/libs/supabase/membership';
import { getEnvVar } from '@/utils/get-env-var';
import { createServerClient } from '@supabase/ssr';

const memberRoutes = ['/account', '/manage-subscription'];

// Redirects while keeping the refreshed auth cookies.
function redirectTo(request: NextRequest, source: NextResponse, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = '';
  const response = NextResponse.redirect(url);
  for (const cookie of source.cookies.getAll()) {
    response.cookies.set(cookie);
  }
  return response;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    getEnvVar(process.env.NEXT_PUBLIC_SUPABASE_URL, 'NEXT_PUBLIC_SUPABASE_URL'),
    getEnvVar(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, 'NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            request.cookies.set(name, value);
          }

          supabaseResponse = NextResponse.next({
            request,
          });

          for (const { name, value, options } of cookiesToSet) {
            supabaseResponse.cookies.set(name, value, options);
          }
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Route guards. The private area requires a session and an approved application.
  const { pathname } = request.nextUrl;
  const needsMember = memberRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  const needsSession = needsMember || pathname === '/apply' || pathname.startsWith('/apply/');

  if (needsSession) {
    if (!user) {
      return redirectTo(request, supabaseResponse, '/login');
    }

    const status = await getApplicationStatus(supabase, user.id);

    if (needsMember && status !== 'approved') {
      return redirectTo(request, supabaseResponse, '/apply');
    }

    if (!needsMember && status === 'approved') {
      return redirectTo(request, supabaseResponse, '/account');
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
