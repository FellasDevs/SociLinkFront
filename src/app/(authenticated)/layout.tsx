import type { Metadata } from 'next';
import '../../styles/globals.css';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';
import { GetSelfRequest } from '@/http/requests/users';

export const metadata: Metadata = {
  title: 'SociLink',
  description: 'Rede Social muito boa',
}

export default async function AuthenticatedLayout({ children }: { children: ReactNode }) {
  if (!cookies().get('authToken')?.value) {
    redirect('/auth');
  }

  const user = await GetSelfRequest();

  if (!user) {
    cookies().set('authToken', '');
    redirect('/auth');
  }

  return (
    <div className='flex min-h-screen'>
      <Sidebar />

      <div className='w-full'>
        <Navbar />
        <main>{children}</main>
      </div>
    </div>

  )
}