import { NextResponse } from "next/server";

export default function middleware (request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('X-Url', request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}