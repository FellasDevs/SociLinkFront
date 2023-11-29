'use client';

import { InfiniteScroll } from '@/components/global/InfiniteScroll';
import { UserButton } from '@/components/global/UserButton';
import { useFriendshipRequests } from '@/hooks/queries/useFriendshipRequests';

export const FriendshipRequestsList = () => {
  const { data: requests, ...queryParams  } = useFriendshipRequests({
    page: 1,
    pageSize: 10,
  });

  if (!requests?.pages.flat().length)
    return <div className='m-5 text-lg'>Não há nenhuma solicitação de amizade no momento.</div>

  return (
    <InfiniteScroll {...queryParams}>
      <div className='flex flex-col gap-2'>
        {
          requests?.pages.flat().map((request) => (
            <UserButton key={request.Id} user={request.Friend} />
          ))
        }
      </div>
    </InfiniteScroll>
  )
}