import '../../styles/globals.css';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { UserRoutes } from '@/http/requests/server-side/users';


type Props = { children: ReactNode }

export default async function PublicLayout({ children }: Props) {
  if (!!cookies().get('authToken')?.value) {
    const user = await UserRoutes.getSelf();

    if (!!user) redirect('/');
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-[80vw] max-w-[25em] text-xl'>
        <div className='mb-10 font-bold'>SociLink</div>

        {children}
      </div>
    </div>
  )
}