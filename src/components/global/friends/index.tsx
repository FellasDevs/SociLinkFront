import { Suspense } from 'react';

import { FriendsList } from '@/components/global/friends/FriendsList';
import { FriendsRequestsList } from '@/components/global/friends/FriendsRequestsList';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export const FriendsArea = () => {
  return (
    <>
      <div className="text-2xl">Amizades</div>
      <ScrollArea className="grow">
        <Suspense>
          <FriendsList />
        </Suspense>
      </ScrollArea>

      <Separator className="my-5" />

      <div className="text-2xl">Solicitações</div>
      <ScrollArea className="shrink">
        <Suspense>
          <FriendsRequestsList />
        </Suspense>
      </ScrollArea>
    </>
  );
};
