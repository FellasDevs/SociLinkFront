'use client';

import { InfiniteScroll } from '@/components/global/InfiniteScroll';
import { UserButton } from '@/components/global/UserButton';
import { useFriends, UseFriendsProps } from '@/hooks/queries/useFriends';

export const FriendsList = (props: UseFriendsProps) => {
  const { data: friendships, ...queryParams } = useFriends(props);

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