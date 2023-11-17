import { useRouter } from 'next/navigation';

import { SignInProps, SignInRequest, SignUpProps, SignUpRequest } from '@/http/requests/auth';
import { setCookie } from 'cookies-next';

export const useAuth = () => {
  const router = useRouter();

  const signIn = async (props: SignInProps) => {
    try {
      const { data } = await SignInRequest(props);

      setCookie('authToken', data.data.AuthToken);
      router.push('/');
    } catch (e: any) {
      console.error(e)
      alert(e.response?.data?.message || 'Aconteceu um erro ao tentar entrar em sua conta, tente novamente mais tarde.')
    }
  };

  const signUp = async (props: SignUpProps) => {
    try {
      const { data } = await SignUpRequest(props);

      setCookie('authToken', data.data.AuthToken);
      router.push('/');
    } catch (e: any) {
      console.error(e)
      alert(e.response?.data?.message || 'Aconteceu um erro ao tentar entrar em sua conta, tente novamente mais tarde.')
    }
  };

  return {
    signIn,
    signUp,
  }
}