"use server"
import { graphqlClient } from "@/lib/graphqlClient";
import { authType } from "../schema/auth";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "@/graphql/mutations";
import toast from "react-hot-toast";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type SignupResponse = {
    createUser: {
        email: string;
        name: string;
    };
};

type SigninResponse = {
    signin: {
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
        };
    };
};


export async function OnSubmitSignin(data: authType) {
    try {
        const response = await graphqlClient.request<SigninResponse>(
            LOGIN_MUTATION,
            { email: data.email, password: data.password }
        );

        if (!response.signin) {
            return null;
        }
        const { access_token, user } = response.signin;

        const cookieStore = await cookies();
        cookieStore.set("access_token", access_token)

        return { access_token, user };

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


export async function logout() {
    const cookieStore = await cookies();
    cookieStore.set("access_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: new Date(0),
    });

    redirect("/signin");
}




