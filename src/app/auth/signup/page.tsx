import { Metadata } from 'next';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Link from 'next/link';

import { AuthErrorFallback } from '@/components/pages/auth/AuthErrorFallback';
import { SignUpForm } from '@/components/pages/auth/SignUpForm';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Cadastro',
  description: 'Crie sua conta',
}

export default async function SignUpPage() {
  return (
    <>
      <ErrorBoundary errorComponent={AuthErrorFallback}>
        <SignUpForm />
      </ErrorBoundary>

      <div className='mt-10 flex items-center justify-end space-x-3 text-start'>
        <h3>Já possúi uma conta?</h3>

        <Link href={'/auth/signin'} passHref>
          <Button variant='outline'>
            Clique aqui!
          </Button>
        </Link>
      </div>
    </>
  )
}