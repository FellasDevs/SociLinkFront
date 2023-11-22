import '../../styles/globals.css';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { GetSelfRequest } from '@/http/requests/server-side/users';

const logout = () => {
  revalidateTag('getSelf');
  redirect('/auth/signin');
}

type Props = { children: ReactNode }

export default async function AuthenticatedLayout({ children }: Props) {
  if (!cookies().get('authToken')?.value) {
    logout();
    return null;
  }

  const user = await GetSelfRequest();

  if (!user) {
    logout();
    return null;
  }

  return <>{children}</>
}