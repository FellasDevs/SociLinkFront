'use client'

import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const router = useRouter();

  const handleClick = () => {
    document.cookie = 'token=asdasd';
    router.push('/');
  }

  return (
    <div>
      <button onClick={handleClick}>asdasdas</button>
    </div>
  )
}