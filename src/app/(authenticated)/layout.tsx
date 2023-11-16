import type { Metadata } from 'next';
import '../../styles/globals.css';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { Sidebar } from '@/components/layout/sidebar';


export const metadata: Metadata = {
  title: 'SociLink',
  description: 'Rede Social muito boa',
}

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  if (!cookies().get('token')) {
    redirect('/login');
  }

  return (
    <html lang="pt">
      <body className='flex min-h-screen'>
        <Sidebar />

        <main>{children}</main>
      </body>
    </html>
  )
}