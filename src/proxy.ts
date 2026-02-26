import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Pass the current pathname to Server Components via a request header.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  let res = NextResponse.next({ request: { headers: requestHeaders } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            req.cookies.set(name, value)
          );
          res = NextResponse.next({ request: { headers: requestHeaders } });
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const next = encodeURIComponent(pathname);

  if (!user && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL(`/login?next=${next}`, req.url));
  }

  if (!user && pathname.startsWith("/account")) {
    return NextResponse.redirect(new URL(`/login?next=${next}`, req.url));
  }

  if (!user && pathname.startsWith("/customer")) {
    return NextResponse.redirect(new URL(`/login?next=${next}`, req.url));
  }

  if (!user && pathname.startsWith("/contractor")) {
    return NextResponse.redirect(new URL(`/login?next=${next}`, req.url));
  }

  if (user && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*", "/customer/:path*", "/contractor/:path*", "/login"],
};
