'use client';

import Link from 'next/link';

import { InfiniteScroll } from '@/components/global/InfiniteScroll';
import { UserButton } from '@/components/global/UserButton';
import { useFriends } from '@/hooks/queries/useFriends';

export const FriendsList = () => {
  const { data: friendships, ...queryParams } = useFriends({
    page: 1,
    pageSize: 10,
  });

  if (!friendships?.pages.flat().length) {
    return (
      <div className='m-5 text-lg'>
        <div>Parece que você ainda não tem nenhum amigo.</div>
        <Link href='/search'>
          Clique aqui para encontrar pessoas.
        </Link>
      </div>
    );
  }

  return (
    <InfiniteScroll {...queryParams}>
      <div className='flex flex-col gap-2'>
        {
          friendships?.pages.flat().map(({ Id, Friend }) => (
            <UserButton key={Id} user={Friend} variant='secondary' />
          ))
        }
      </div>
    </InfiniteScroll>
  )
}