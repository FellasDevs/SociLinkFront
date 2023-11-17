import { redirect } from 'next/navigation';

import { AuthComponent } from '@/components/auth';
import { GetSelfRequest } from '@/http/requests/users';

export default async function Login () {
  const user = await GetSelfRequest();

  if (!!user) redirect('/');

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-[80vw] max-w-[25em] text-xl'>
        <div className='mb-10 font-bold'>SociLink</div>

        <AuthComponent />
      </div>
    </div>
  )
}