"use server"
import { DecodedToken } from "@/types/decode.types";
import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserData() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    console.log("access token in middlewate ->", accessToken)

    if (!accessToken) return null;

    const decodedToken = decode(accessToken);
    console.log("Decoded token ->", decodedToken);

    return decodedToken as DecodedToken;
}