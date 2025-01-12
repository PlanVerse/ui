import { NextResponse } from "next/server";

export default function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('X-Url', request.url);

  const token = request.cookies.token ?? null;

  const unprotectedPaths = [
    "/account/signin",
    "/account/signup"
  ];
  const isUnprotectedPath = unprotectedPaths.some(path => request.nextUrl.pathname === path);

  if (!isUnprotectedPath && !token) {
    if (request.nextUrl.pathname !== "/") {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    };
  } else if (isUnprotectedPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  };

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
};

export const config = {
  matcher: ['/((?!api|.*\\..*|_next/static|_next/image|manifest.json|assets|favicon.ico).*)'],
};