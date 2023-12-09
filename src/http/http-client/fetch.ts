'use server'

import { cookies } from 'next/headers';

import { BaseResponse } from '@/types/http/BaseResponse';

export const fetchClient = async<T> (input: RequestInfo | URL, init?: RequestInit)  => {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL! + input, {
    ...init,
    headers: {
      Authorization: 'Bearer ' + cookies().get('authToken')?.value,
    },
  });
  
  if (!response.ok) {
    const data = await response.json() as BaseResponse<T>;
    throw new Error(data.message);
  }

  return await response.json() as BaseResponse<T>;
}