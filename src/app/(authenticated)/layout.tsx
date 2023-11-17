import type { Metadata } from 'next';
import '../../styles/globals.css';
import { revalidateTag } from 'next/cache';
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

const logout = () => {
  revalidateTag('getSelf');
  redirect('/auth');
}

export default async function AuthenticatedLayout({ children }: { children: ReactNode }) {
  if (!cookies().get('authToken')?.value) logout();

  const user = await GetSelfRequest();

  if (!user) logout();

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