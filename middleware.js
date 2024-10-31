import { NextResponse } from "next/server";

export async function middleware(request) {
  if (true) {
    return NextResponse.redirect(
      new URL(
        `/login?callbackUrl=${encodeURIComponent(request.url)}`,
        request.url,
      ),
    );
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/api/v1", "/api/v1/:path*"],
};
