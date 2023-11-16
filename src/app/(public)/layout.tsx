import type { Metadata } from 'next';
import '../../styles/globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'SociLink',
  description: 'Rede Social muito boa',
}

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
    <body className='flex min-h-screen'>

    <main>{children}</main>
    </body>
    </html>
  )
}