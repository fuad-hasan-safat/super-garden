/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "jsonwebtoken";
import { constants } from "buffer";

const authRoutes = ["/signin", "/signup"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
   console.log("access token in middlewate ->", accessToken)
    // 1. If not logged in
    if (!accessToken) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(
                new URL(
                    pathname ? `/signin?redirect=${pathname}` : "/signin",
                    request.url
                )
            );
        }
    }

    // 2. Decode token to extract role and profile completion status
    let decodedToken: any;
    try {
        decodedToken =  decode(accessToken);
        console.log("Decoded token ->", decodedToken)

        if (authRoutes.includes(pathname)) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    } catch (error) {
        console.log(error);
        // If token is invalid, force logout
        return NextResponse.redirect(new URL("/signin", request.url));
    }



    return NextResponse.next();
}

export const config = {
    matcher: [
        "/signin",
        "/signup",
        // Add other protected routes below if needed
        // "/dashboard/:path*",
        // "/admin-dashboard/:path*",
        // "/driver-dashboard/:path*",
    ],
};