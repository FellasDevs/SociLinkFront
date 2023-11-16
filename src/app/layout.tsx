import { ReactNode } from 'react';

import { Providers } from '@/providers';
import { GeistSans } from "geist/font/sans";

export default function RootLayout({ children }: {children: ReactNode}) {
  return (
    <html lang="pt" className={GeistSans.className}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}