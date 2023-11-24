import '../styles/globals.css';

import {Metadata} from 'next';
import {ReactNode} from 'react';

import {Sidebar} from '@/components/layout/sidebar';
import {Providers} from '@/providers';
import {GeistSans} from 'geist/font/sans';

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
            <Sidebar />

            <div className='w-full'>
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}