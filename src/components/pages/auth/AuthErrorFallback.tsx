'use server'

import { Button } from '@/components/ui/button';

export const AuthErrorFallback = (props: { error: Error; reset: () => void }) => {
  if (!props) return null;

  return (
    <div>
      <div className='text-2xl'>Ocorreu um erro ao tentar realizar essa ação</div>
      <div className='text-sm'>{props.error?.message}</div>

      <Button onClick={props.reset}>
        Tentar novamente
      </Button>
    </div>
  )
}