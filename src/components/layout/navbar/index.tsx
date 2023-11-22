import Link from 'next/link';
import { Suspense } from 'react';

import { ProfileIcon } from '@/components/layout/navbar/ProfileIcon';
import { ThemeButton } from '@/components/layout/theme-button';
import { Button } from '@/components/ui/button';

export const AuthenticatedNavbar = () => {
  return (
    <div className='flex justify-end gap-5 p-2 shadow-xl'>
      <Suspense>
        <ProfileIcon />
      </Suspense>
      
      <ThemeButton />
    </div>
  )
}
export const PublicNavbar = () => {
  return (
    <div className='flex justify-end gap-5 p-2 shadow-xl'>
      <Link href='/auth/signin' passHref>
        <Button>
          Entrar
        </Button>
      </Link>

      <ThemeButton />
    </div>
  )
}