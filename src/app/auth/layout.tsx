import '../../styles/globals.css';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { GetSelfRequest } from '@/http/requests/server-side/users';

type Props = { children: ReactNode }

export default async function PublicLayout({ children }: Props) {
  if (!!cookies().get('authToken')?.value) {
    const user = await GetSelfRequest();

    if (!!user) redirect('/');
  }

  return <>{children}</>
}