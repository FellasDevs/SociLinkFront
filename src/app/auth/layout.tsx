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
    <div className='flex min-h-screen items-center justify-center p-5'>
      <div className='w-full max-w-[30em] text-2xl'>
        <div className='mb-5 font-bold'>SociLink</div>

        <div className='w-full max-w-[70em] rounded-xl p-5 shadow-lg dark:border dark:border-input'>
          {children}
        </div>
      </div>
    </div>
  )
}