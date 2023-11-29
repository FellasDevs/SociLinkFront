import '../styles/globals.css';

import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';

import { FriendshipsBar } from '@/components/layout/friendships-bar';
import { MobileNavbar } from '@/components/layout/mobile-navbar';
import { Sidebar } from '@/components/layout/sidebar';
import { UserRoutes } from '@/http/requests/server-side/users';
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
          <MobileNavbar />

          <div className='flex min-h-screen w-full'>
            <Sidebar />

            <div className='w-full'>
              {children}
            </div>

            <Suspense>
              <GetFriendshipsBar />
            </Suspense>
          </div>
        </Providers>
      </body>
    </html>
  )
}

const GetFriendshipsBar = async () => {
  const user = await UserRoutes.getSelf();

  if (!user) return null;

  return <FriendshipsBar />
}