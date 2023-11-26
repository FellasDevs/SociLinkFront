import Link from 'next/link';
import { Suspense } from 'react';

import { FriendshipRequestsList } from '@/components/layout/friendships-bar/FriendshipRequestsList';
import { FriendsList } from '@/components/layout/friendships-bar/FriendsList';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  GetFriendshipRequestsParams,
  GetFriendsParams,
  ServerSideFriendsRoutes,
} from '@/http/requests/server-side/friends';

export const FriendshipsBar = () => {
  return (
    <div className='sticky right-0 top-0 flex h-screen w-full max-w-[15em] flex-col p-2 shadow-2xl dark:border-r dark:border-r-amber-50'>
      <div className='text-2xl'>Amizades</div>
      <ScrollArea className='grow'>
        <Suspense>
          <GetFriendsList />
        </Suspense>
      </ScrollArea>

      <Separator className='my-5' />

      <div className='text-2xl'>Solicitações</div>
      <ScrollArea className='shrink'>
        <Suspense>
          <GetFriendshipRequestsList />
        </Suspense>
      </ScrollArea>
    </div>
  )
}

const GetFriendsList = async () => {
  const params: GetFriendsParams = {
    page: 1,
    pageSize: 10,
  };

  const friends = await ServerSideFriendsRoutes.getFriends(params);

  if (!friends?.length) {
    return (
      <div className='text-lg'>
        <div>Parece que você ainda não tem nenhum amigo.</div>
        <Link href='/search'>
          <div>Clique aqui para encontrar pessoas.</div>
        </Link>
      </div>
    );
  }

  return <FriendsList initialData={friends} params={params} />
}

const GetFriendshipRequestsList = async () => {
  const params: GetFriendshipRequestsParams = {
    page: 1,
    pageSize: 10,
  };

  const requests = await ServerSideFriendsRoutes.getFriendshipRequests(params);

  if (!requests?.length)
    return <div className='m-5 text-lg'>Não há nenhuma solicitação de amizade no momento.</div>

  return <FriendshipRequestsList initialData={requests} params={params} />
}

