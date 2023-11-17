'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/auth';

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button onClick={logout} className='mt-auto rounded shadow'>
      Sair
    </Button>
  )
}