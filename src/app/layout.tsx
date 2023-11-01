import type {Metadata} from 'next'
import '../styles/globals.css'
import {ReactNode} from "react";

import {Footer} from "@/components/layout/footer";
import {Navbar} from "@/components/layout/navbar";


export const metadata: Metadata = {
  title: 'SociLink',
  description: 'Rede Social muito boa',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <body className='flex min-h-screen flex-col'>
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  )
}
