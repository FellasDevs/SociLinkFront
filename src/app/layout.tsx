import '../styles/globals.css';

import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';

import { AuthenticatedNavbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';
import { GetSelfRequest } from '@/http/requests/server-side/users';
import { Providers } from '@/providers';
import { GeistSans } from 'geist/font/sans';

export const metadata: Metadata = {
  title: 'SociLink',
  description: 'Rede Social muito boa',
}

type Props = { children: ReactNode }

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="pt" className={GeistSans.className}>
      <body>
        <Providers>
          <div className='flex min-h-screen w-full'>
            <Suspense>
              <GetSidebar />
            </Suspense>

            <div className='w-full'>
              <Suspense>
                <GetNavbar />
              </Suspense>

              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}

const GetSidebar = async () => {
  const user = await GetSelfRequest();

  if (!user) return null;

  return <Sidebar />
}

const GetNavbar = async () => {
  const user = await GetSelfRequest();

  if (!user) return null;

  return <AuthenticatedNavbar />
}