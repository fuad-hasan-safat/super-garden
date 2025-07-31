"use client";
import React from 'react';
import { AppForm } from '../app-form/app-form';
import { authSchema, authType } from '../schema/auth';
import AppInputField from '../app-form/app-input-field';
import { Button } from '../ui/button';

export default function AuthForm() {
  const onSubmit = (data: authType) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <div>
      <AppForm <authType>
        schema={authSchema}
        onSubmit={onSubmit}
        className='space-y-2'
      >
        {
          ({ register, formState: { errors } }) => (
            <>
              <div>
                <AppInputField
                  name='email'
                  type='text'
                  label='Email'
                  register={register}
                  errors={errors}
                  placeholder='example@mail.com'
                  containerClass='space-y-2'
                  key={'Naemmeme'}
                />

                <AppInputField
                  name='password'
                  type='password'
                  label='Password'
                  register={register}
                  errors={errors}
                  placeholder='Enter your password'
                  
                />
              </div>

              <div>
                <Button type='submit'>Submit</Button>
              </div>
            </>
          )

        }
      </AppForm>
    </div>
  );
}
