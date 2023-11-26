import { User } from '@/types/models/User';

import { fetchClient } from '@/http/http-client/fetch';

export type SignInProps = {
  email: string;
  password: string;
}

export type SignUpProps = {
  email: string;
  password: string;
  birthdate: string;
  nickname: string;
  name: string;
}

export type AuthResponse = {
  User: User;
  AuthToken: string;
}

export const AuthRoutes = {
  signInRequest: async (props: SignInProps): Promise<AuthResponse | null> => {
    try {
      const { data } =  await fetchClient<AuthResponse>('/auth/sign_in', { method: 'POST', body: JSON.stringify(props) });

      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  signUpRequest: async (props: SignUpProps): Promise<AuthResponse | null> => {
    try {
      const { data } = await fetchClient<AuthResponse>('/auth/sign_up', { method: 'POST', body: JSON.stringify(props) });

      return data;
    } catch (e) {
      console.error(e);

      return null;
    }
  },
}