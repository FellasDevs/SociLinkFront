'use client';

import { InfiniteScroll } from '@/components/global/InfiniteScroll';
import { UserButton } from '@/components/global/UserButton';
import { useFriendshipRequests, UseFriendshipRequestsProps } from '@/hooks/queries/useFriendshipRequests';

export const FriendshipRequestsList = (props: UseFriendshipRequestsProps) => {
  const { data: requests, ...queryParams  } = useFriendshipRequests(props);

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