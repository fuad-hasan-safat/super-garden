"use server"
import { graphqlClient } from "@/lib/graphqlClient";
import { authType } from "../schema/auth";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "@/graphql/mutations";
import toast from "react-hot-toast";
import { cookies } from "next/headers";

type SignupResponse = {
    createUser: {
        email: string;
        name: string;
    };
};

export async function OnSubmitSignin(data: authType) {
    try {
        const response = await graphqlClient.request<{ signin: { access_token: string } }>(
            LOGIN_MUTATION,
            { email: data.email, password: data.password }
        );

        if (!response.signin) {
            return null;
        }
        const token = response.signin.access_token;
        const cookieStore = await cookies();
        cookieStore.set("access_token", token)
        return token
    } catch (error: any) {
        console.error(error.response?.errors?.[0]?.message || 'Login failed');
    }
}

export async function OnSubmitSignup(data: authType) {
    try {
        const response = await graphqlClient.request<SignupResponse>(SIGNUP_MUTATION, {
            createUserInput: {
                email: data.email,
                password: data.password,
                name: data.email.split('@')[0],
            },
        });

        if (!response.createUser) {
            return null
        }

        return response.createUser
    } catch (error: any) {
        console.error(error.response?.errors?.[0]?.message || 'Signup failed');
    }
}
