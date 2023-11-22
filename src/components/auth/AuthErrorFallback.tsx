'use server'

import { Button } from '@/components/ui/button';

export const AuthErrorFallback = ({error, reset}: { error: Error; reset: () => void }) => {
  return (
    <div>
      <div className='text-2xl'>Ocorreu um erro ao tentar realizar essa ação</div>
      <div className='text-sm'>{error.message}</div>

      <Button onClick={reset}>
        Tentar novamente
      </Button>
    </div>
  )
}