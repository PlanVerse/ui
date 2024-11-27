import { NextResponse } from "next/server";

export default function middleware (request) {
  const token = request.cookies.token ?? null;

  // 보호되지 않은 경로 목록
  const unprotectedPaths = [
    "/auth/sign-in",
    "/auth/sign-up"
  ];
  const isUnprotectedPath = unprotectedPaths.some(path => request.nextUrl.pathname === path);

  if (!isUnprotectedPath && !token) {
    // 보호되지 않은 경로가 아니고 토큰이 없는 경우
    // 토큰이 없으면 로그인 페이지로 리다이렉트
    return NextResponse.redirect("/signin");
  } else if (isUnprotectedPath && !token) {
    // 보호되지 않은 경로이고 토큰이 없는 경우 :: 혹시 모르니 추가

    // 토큰이 없으면 로그인 페이지로 리다이렉트
    return NextResponse.redirect("/signin");
  } else if (isUnprotectedPath && token) {
    // 보호되지 않은 경로이고 토큰이 있는 경우

    // 토큰이 없으면 메인 페이지로 리다이렉트
    return NextResponse.redirect("/");
  }

  // 토큰이 있는 경우, 여기서 추가적인 검증을 수행할 수 있습니다.
  // 예: 토큰 만료 시간 확인 (서버 측에서 수행해야 함)

  return NextResponse.next();
}

export const config = {
  // 모든 경로에 대해 미들웨어 실행
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
