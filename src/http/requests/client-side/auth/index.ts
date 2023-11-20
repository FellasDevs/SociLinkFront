import { BaseResponse } from '@/types/http/BaseResponse';
import { User } from '@/types/models/User';

import { httpClient } from '@/http/http-client/axios';

export type SignInProps = {
  email: string;
  password: string;
}

export type SignUpProps = {
  email: string;
  password: string;
  birthdate: string;
  nickname: string;
}

export type AuthResponse = BaseResponse<{
  User: User;
  AuthToken: string;
}>

export const SignInRequest = async (props: SignInProps) => {
  return httpClient.post<AuthResponse>('/auth/sign_in', props)
}

export const SignUpRequest = async (props: SignUpProps) => {
  return httpClient.post<AuthResponse>('/auth/sign_up', props)
}