"use client";
import React from 'react';
import { AppForm } from '../app-form/app-form';
import { authSchema, authType } from '../schema/auth';
import AppInputField from '../app-form/app-input-field';
import { Button } from '../ui/button';
import Image from 'next/image';
import { graphqlClient } from '@/lib/graphqlClient';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface AuthFormProps {
  formType: 'signin' | 'signup';
}

type LoginResponse = {
  login: string; 
};


export default function AuthForm({ formType = 'signin' }: AuthFormProps) {
  const router = useRouter();
  const isSignIn = formType === 'signin';
  const title = isSignIn ? 'Sign In to Your Garden' : 'Grow Your Garden';
  const buttonText = isSignIn ? 'Sign In' : 'Create Account';
  const footerText = isSignIn ? "Don't have an account?" : "Already have an account?";
  const footerAction = isSignIn ? 'signup' : 'signin';
  const footerLinkText = isSignIn ? 'Sign Up' : 'Sign In';

  async function OnSubmitSignin(data: authType) {
    try {
      const response = await graphqlClient.request<LoginResponse>(LOGIN_MUTATION, {
        email: data.email,
        password: data.password,
      });
      const token = response.login;
      localStorage.setItem('token', token);
      toast('Hey you Logged in successfully');
      // router.push('/dashboard'); // or your intended route
    } catch (error: any) {
      toast(error.response?.errors?.[0]?.message || 'Login failed');
    }
  }

  async function OnSubmitSignup(data: authType) {
    try {
      const response = await graphqlClient.request(SIGNUP_MUTATION, {
        createUserInput: {
          email: data.email,
          password: data.password,
          name: data.email.split('@')[0], // or ask name in form
        },
      });
      alert('Signup successful!');
      router.push('/signin');
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function onSubmit(data: authType) {
    if (isSignIn) {
      OnSubmitSignin(data);
    } else {
      OnSubmitSignup(data);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Toaster/>
      {/* Animated Plant Styles */}
      <style jsx>{`
        @keyframes grow {
          0% { transform: scale(0.8) translateY(5px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        
        @keyframes sway {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(3deg); }
          75% { transform: rotate(-3deg); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        .plant-animation {
          animation: 
            grow 0.8s ease-out forwards,
            sway 3s ease-in-out 0.8s infinite;
        }
        
        .leaf-1-animation {
          animation: bounce 2s ease-in-out 1.2s infinite;
        }
        
        .leaf-2-animation {
          animation: bounce 2.2s ease-in-out 1.3s infinite;
        }
      `}</style>

      <div className="w-full max-w-md">
        {/* Header with animated plant logo */}
        <div className="text-center mb-8">
          <div className="mx-auto bg-green-100 h-20 w-20 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <Image
              src={`/icon/plant.ico`}
              alt='plants'
              width={200}
              height={200}
            />
          </div>
          <h1 className="text-3xl font-bold text-green-800">Super Garden</h1>
          <p className="mt-2 text-green-600">{title}</p>
        </div>

        {/* ... rest of the component remains the same ... */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
          <AppForm<authType>
            schema={authSchema}
            onSubmit={onSubmit}
            className="space-y-5"
          >
            {({ reset, register, formState: { errors, isSubmitting, isSubmitted } }) => {
              return (
                <>
                  <AppInputField
                    name="email"
                    type="email"
                    label="Email Address"
                    register={register}
                    errors={errors}
                    placeholder="your@email.com"
                    containerClass="space-y-1"
                    inputClass="py-3 px-4 border-green-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />

                  <AppInputField
                    name="password"
                    type="password"
                    label="Password"
                    register={register}
                    errors={errors}
                    placeholder="••••••••"
                    containerClass="space-y-1"
                    inputClass="py-3 px-4 border-green-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />

                  {!isSignIn && (
                    <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">
                      <p className="font-medium">Password requirements:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>At least 8 characters</li>
                        <li>One uppercase letter</li>
                        <li>One special character</li>
                      </ul>
                    </div>
                  )}

                  {isSignIn && (
                    <div className="text-right">
                      <a
                        href="#"
                        className="text-sm font-medium text-green-600 hover:text-green-500 transition-colors"
                      >
                        Forgot password?
                      </a>
                    </div>
                  )}

                  <div className="pt-3">
                    <Button
                      type="submit"
                      className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200"
                      disabled={isSubmitting}
                      onClick={() => {
                        if (isSubmitted) {
                          reset();
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : buttonText}
                    </Button>
                  </div>
                </>
              )
            }}
          </AppForm>

          <div className="mt-6 pt-5 border-t border-green-100">
            <p className="text-center text-sm text-gray-500">
              {footerText}{' '}
              <a
                href={`/${footerAction}`}
                className="font-medium text-green-600 hover:text-green-500 transition-colors"
              >
                {footerLinkText}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-green-600/80">
          © {new Date().getFullYear()} Super Garden. Cultivating beautiful spaces.
        </div>
      </div>
    </div>
  );
}