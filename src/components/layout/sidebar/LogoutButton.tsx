'use client'

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const LogoutButton = () => {
const router = useRouter()
  const logout = () => {
    document.cookie = "token=;"
    router.push('/login')
  }

  return (
    <Button onClick={logout} className='mt-auto rounded shadow'>Sair</Button>
  )
}