import type { Metadata } from 'next';
import '../../styles/globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'SociLink',
  description: 'Rede Social muito boa',
}

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <main>{children}</main>
  )
}