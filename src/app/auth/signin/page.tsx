import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Link from 'next/link';

import { AuthErrorFallback } from '@/components/pages/auth/AuthErrorFallback';
import { SignInForm } from '@/components/pages/auth/SignInForm';
import { Button } from '@/components/ui/button';

export default async function SignInPage() {
  return (
    <>
      <ErrorBoundary errorComponent={AuthErrorFallback}>
        <SignInForm />
      </ErrorBoundary>

      <div className='mt-10 flex items-center justify-end space-x-3 text-start'>
        <h3>Ainda não possúi uma conta?</h3>

        <Link href={'/auth/signup'} passHref>
          <Button variant='outline'>
            Clique aqui!
          </Button>
        </Link>
      </div>
    </>
  )
}