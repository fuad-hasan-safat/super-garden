"use server";
import { cookies } from "next/headers";
import { graphqlClient } from "./graphqlClient";
import { GET_USER_BY_ID } from "@/graphql/mutations";
import { decode } from "jsonwebtoken";
import { DecodedToken } from "@/types/decode.types";

export async function getUserData() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    console.log("access token in middleware ->", accessToken);

    if (!accessToken) return null;

    try {
        const decodedToken = decode(accessToken) as DecodedToken;
        console.log("Decoded token ->", decodedToken)
        const response = await graphqlClient.request<UserResponse>(
            GET_USER_BY_ID,
            { id: decodedToken.sub }
        );
        console.log("response", response);
        return response.user;

    } catch (error) {
        console.error("Failed to fetch user:", error);
        return null;
    }
}
