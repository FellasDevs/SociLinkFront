import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Link from 'next/link';

import { AuthErrorFallback } from '@/components/pages/auth/AuthErrorFallback';
import { SignUpForm } from '@/components/pages/auth/SignUpForm';
import { Button } from '@/components/ui/button';

export default async function SignUpPage() {
  return (
    <div>
      <ErrorBoundary errorComponent={AuthErrorFallback}>
        <SignUpForm />
      </ErrorBoundary>

      <div className='mt-10 flex items-center justify-end space-x-3 text-center'>
        <h3>Já possúi uma conta?</h3>

        <Link href={'/auth/signin'} passHref>
          <Button>
            Clique aqui!
          </Button>
        </Link>
      </div>
    </div>
  )
}