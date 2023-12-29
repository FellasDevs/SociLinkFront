'use client';

import { FriendshipButton } from '@/components/global/FriendshipButton';
import { InfiniteScroll } from '@/components/global/InfiniteScroll';
import { useFriends, UseFriendsProps } from '@/hooks/queries/useFriends';

type Props = UseFriendsProps & { showCreatedAt?: boolean };

export const FriendshipList = ({ showCreatedAt, ...params }: Props) => {
  const { data: friendships, ...queryParams } = useFriends(params);

  return (
    <InfiniteScroll {...queryParams}>
      <div className="flex flex-col gap-2">
        {friendships?.pages
          .flat()
          .map((friendship) => (
            <FriendshipButton
              key={friendship.Id}
              friendship={friendship}
              showCreatedAt={showCreatedAt}
              variant="secondary"
            />
          ))}
      </div>
    </InfiniteScroll>
  );
};
