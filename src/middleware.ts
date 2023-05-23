import { NextRequest, NextResponse } from "next/server";

/*
matcher : middleware.jsを適用する（呼び出す）パスを指定する
*/
export const config = {
  matcher: ["/:path*", "/test/:path*"],
};

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  const url = req.nextUrl;

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = Buffer.from(authValue, "base64").toString().split(":");

    if (user === process.env.NEXT_PUBLIC_USER && pwd === process.env.NEXT_PUBLIC_PASS) {
      return NextResponse.next();
    }
  }
  url.pathname = "/api/auth";

  return NextResponse.rewrite(url);
}
