import { Metadata } from 'next';

import { AuthComponent } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Página de login',
}

export default async function AuthPage() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-[80vw] max-w-[25em] text-xl'>
        <div className='mb-10 font-bold'>SociLink</div>
        <AuthComponent />
      </div>
    </div>
  )
}