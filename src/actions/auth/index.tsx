'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AuthRoutes, SignInProps, SignUpProps } from '@/http/requests/server-side/auth';

export const signInAction = async (props: SignInProps): Promise<string | null> => {
  try {
    const data = await AuthRoutes.signInRequest(props);

    if (!data) return 'Não foi possível entrar em sua conta, tente novamente mais tarde.';

    cookies().set('authToken', data.AuthToken);
    revalidateTag('get-self');

    return null;
  } catch (e: any) {
    return e.response?.data?.message || 'Aconteceu um erro ao tentar entrar em sua conta, tente novamente mais tarde.';
  }
};

export const signUpAction = async (props: SignUpProps): Promise<string | null> => {
  try {
    const data = await AuthRoutes.signUpRequest(props);

    if (!data) return 'Não foi possível entrar em sua conta, tente novamente mais tarde.';

    cookies().set('authToken', data.AuthToken);
    revalidateTag('get-self');

    return null;
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

    return errorMsg;
  }
};

export const logoutAction = async () => {
  cookies().set('authToken', '');
  revalidateTag('get-self');
  redirect('/auth/signin');
}