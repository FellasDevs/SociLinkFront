import Link from 'next/link';
import { Suspense } from 'react';

import { PageQueryParams } from '@/types/next/Page';

import { SearchArea } from '@/components/pages/search/client-side/SearchArea';
import { Button } from '@/components/ui/button';
import { UserRoutes } from '@/http/requests/server-side/users';

export const SearchUsers = ({ params }: { params: PageQueryParams }) => {
  return (
    <div className='flex flex-col gap-10'>
      <Suspense>
        <SearchArea initialSearch={params.search as string ?? ''} />
      </Suspense>

      <Suspense>
        <GetUsers params={params} />
      </Suspense>
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
    <div className='flex flex-col gap-3'>
      {users.map((user) => (
        <Link key={user.Id} href={'/profile/' + user.Nickname} passHref>
          <Button variant='outline' className='w-full text-2xl'>
            {user.Name}
          </Button>
        </Link>
      ))}
    </div>
  )
}

