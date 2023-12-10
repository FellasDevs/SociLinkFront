import { Metadata } from 'next';
import Link from 'next/link';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  description: 'Página inexistente',
}

export default function ErrorPage() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h2 className='text-4xl font-medium'>Oops... Página não encontrada!</h2>

      <Link href='/'>
        <h2 className='text-3xl font-medium underline'>Clique aqui para voltar para o início</h2>
      </Link>
    </div>
  )
}