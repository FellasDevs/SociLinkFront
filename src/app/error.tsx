'use client'

import '../styles/globals.css';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Socilink',
  description: 'Ocorreu um problema em sua requisição',
}

export default function ErrorPage() {
  return (
    <div className='flex h-max flex-col '>
      <h2 className='text-4xl font-medium'>Algo inesperado aconteceu...</h2>

      <Link href='/'><h2 className='text-3xl font-medium underline'>Clique aqui para voltar para o início</h2></Link>
    </div>
  )
}