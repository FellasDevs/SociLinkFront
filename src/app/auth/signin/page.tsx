import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Link from 'next/link';

import { AuthErrorFallback } from '@/components/auth/AuthErrorFallback';
import { SignInForm } from '@/components/auth/SignInForm';
import { Button } from '@/components/ui/button';

export default async function SignInPage() {
  return (
    <div>
      <ErrorBoundary errorComponent={AuthErrorFallback}>
        <SignInForm />
      </ErrorBoundary>

      <div className='mt-10 flex items-center justify-end space-x-3 text-center'>
        <h3>Ainda não possúi uma conta?</h3>

        <Link href={'/auth/signup'} passHref>
          <Button>
            Clique aqui!
          </Button>
        </Link>
      </div>
    </div>
  )
}