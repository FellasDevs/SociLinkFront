import { Suspense } from 'react';

import { FriendsList } from '@/components/global/friends/FriendsList';
import { FriendsRequestsList } from '@/components/global/friends/FriendsRequestsList';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { UserRoutes } from '@/http/requests/server-side/users';

export const FriendsArea = () => {
  return (
    <>
      <div className="text-2xl">Amizades</div>
      <ScrollArea className="grow">
        <Suspense>
          <GetFriendsArea />
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

const GetFriendsArea = async () => {
  const self = await UserRoutes.getSelf();

  if (!self) return null;

  return <FriendsList user={self} isSelf={true} />;
};
