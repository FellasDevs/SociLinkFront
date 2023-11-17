import type { Metadata } from 'next';
import '../../styles/globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'SociLink',
  description: 'Rede Social muito boa',
}

type Props = { children: ReactNode }

export default function PublicLayout({ children }: Props) {
  return (
    <main>
      {children}
    </main>
  )
}