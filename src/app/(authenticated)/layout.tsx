import type { Metadata } from 'next';
import '../../styles/globals.css';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';

export const metadata: Metadata = {
  title: 'SociLink',
  description: 'Rede Social muito boa',
}

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  if (!cookies().get('token')?.value) {
    redirect('/login');
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