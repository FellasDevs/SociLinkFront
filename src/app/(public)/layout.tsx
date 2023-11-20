import '../../styles/globals.css';
import { ReactNode, Suspense } from 'react';

import { PublicNavbar } from '@/components/layout/navbar';
import { GetSelfRequest } from '@/http/requests/server-side/users';

type Props = { children: ReactNode }

export default async function PublicLayout({ children }: Props) {
  return (
    <>
      <Suspense>
        <GetNavbar />
      </Suspense>
      
      {children}
    </>
  )
}

const GetNavbar = async () => {
  const user = await GetSelfRequest();

  if (!!user) return null;

  return <PublicNavbar />
}