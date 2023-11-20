import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';

export const LogoutButton = () => {
  const action = async () => {
    'use server'
    cookies().set('authToken', '');
    redirect('/auth');
  }

  return (
      <form action={action}>
        <Button type='submit' className='w-full rounded shadow'>
          Sair
        </Button>
      </form>
  )
}