'use client'

import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className='flex h-max flex-col '>
      <h2 className='text-4xl font-medium'>Algo inesperado aconteceu...</h2>

      <Link href='/'><h2 className='text-3xl font-medium'>Clique aqui para voltar para o início</h2></Link>
    </div>
  )
}