'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AuthRoutes, SignInProps, SignUpProps } from '@/http/requests/server-side/auth';

export const signInAction = async (props: SignInProps) => {
  try {
    const data = await AuthRoutes.signInRequest(props);

    if (!data) return;

    cookies().set('authToken', data.AuthToken);
    revalidateTag('get-self');
  } catch (e: any) {
    const errorMsg = e.response?.data?.message || 'Aconteceu um erro ao tentar entrar em sua conta, tente novamente mais tarde.';
    throw new Error(errorMsg);
  }
};

export const signUpAction = async (props: SignUpProps) => {
  try {
    const data = await AuthRoutes.signUpRequest(props);

    if (!data) return;

    cookies().set('authToken', data.AuthToken);
    revalidateTag('get-self');
  } catch (e: any) {
    let errorMsg = e.response?.data?.message || 'Aconteceu um erro ao tentar criar a sua conta, tente novamente mais tarde.'

    switch (e.response?.data?.data?.reason) {
      case 'email':
        errorMsg = 'O e-mail informado já está em uso.';
        break;
      case 'nickname':
        errorMsg = 'O nickname informado já está em uso.';
        break;
    }

    throw new Error(errorMsg);
  }
};

export const logoutAction = async () => {
  cookies().set('authToken', '');
  revalidateTag('get-self');
  redirect('/auth/signin');
}