import { NextResponse } from "next/server";

export default function middleware (request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('X-Url', request.url);

  // const token = request.cookies.token ?? null;

  // const unprotectedPaths = [
  //   "/signin",
  //   "/signup"
  // ];
  // const isUnprotectedPath = unprotectedPaths.some(path => request.nextUrl.pathname === path);

  // if (!isUnprotectedPath && !token) {
  //   return NextResponse.redirect("/signin");
  // } else if (isUnprotectedPath && !token) {
  //   return NextResponse.redirect("/signin");
  // } else if (isUnprotectedPath && token) {
  //   return NextResponse.redirect("/");
  // }

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };