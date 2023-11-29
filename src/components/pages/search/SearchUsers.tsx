import { Suspense } from 'react';

import { PageQueryParams } from '@/types/next/Page';

import { UserButton } from '@/components/global/UserButton';
import { SearchArea } from '@/components/pages/search/client-side/SearchArea';
import { UserRoutes } from '@/http/requests/server-side/users';

export const SearchUsers = ({ params }: { params: PageQueryParams }) => {
  return (
    <div className='flex flex-col gap-10'>
      <div className='mx-auto w-full max-w-[50em]'>
        <Suspense>
          <SearchArea initialSearch={params.search as string ?? ''} />
        </Suspense>
      </div>

      <div className='mx-auto w-full max-w-[50em]'>
        <Suspense>
          <GetUsers params={params} />
        </Suspense>
      </div>
    </div>
  )
}

const GetUsers = async ({ params }: { params: PageQueryParams }) => {
  const page = isNaN(Number(params.page)) ? 1 : Number(params.page);
  const pageSize = isNaN(Number(params.pageSize)) ? 3 : Number(params.pageSize);

  const users = await UserRoutes.searchUsers({
    query: params.search as string ?? '',
    pagination: { page, pageSize },
  });

  if (!users)
    return <div className='text-2xl'>Ocorreu um problema ao procurar os usuários. Tente novamente mais tarde</div>;

  if (!users.length)
    return <div className='text-2xl'>Nenhum usuário encontrado</div>;

  return (
    <div className='mx-auto flex w-[20em] flex-col gap-3'>
      {users.map((user) => (
        <UserButton user={user} key={user.Id} variant='secondary' />
      ))}
    </div>
  )
}

