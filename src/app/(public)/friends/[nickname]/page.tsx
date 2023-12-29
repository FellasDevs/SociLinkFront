import { Suspense } from 'react';

import { FriendsList } from '@/components/global/friends/FriendsList';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserRoutes } from '@/http/requests/server-side/users';

type Props = {
  params: { nickname: string };
};

export default async function FriendsPage({ params: { nickname } }: Props) {
  const self = await UserRoutes.getSelf();
  const user = await UserRoutes.getUserByNickname(nickname);

  if (!user) {
    return (
      <div className="my-auto h-full text-center">Usuário não encontrado</div>
    );
  }

  return (
    <div className="mx-auto flex max-h-[100vw] max-w-[50em] flex-col p-8">
      <div className="max-w-full truncate text-2xl">
        {user.Nickname != self?.Nickname ? (
          <>Amizades de {user.Name}</>
        ) : (
          'Meus amigos'
        )}
      </div>

      <ScrollArea className="grow">
        <Suspense>
          <FriendsList
            user={user.Nickname != self?.Nickname ? user : undefined}
          />
        </Suspense>
      </ScrollArea>
    </div>
  );
}
