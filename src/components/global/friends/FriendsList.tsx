import Link from 'next/link';

import { User } from '@/types/models/User';

import { FriendshipList } from '@/components/layout/friendships-bar/FriendshipList';
import {
  GetFriendsParams,
  ServerSideFriendsRoutes,
} from '@/http/requests/server-side/friends';

type Props = {
  user: User;
  isSelf: boolean;
};

export const FriendsList = async ({ user, isSelf }: Props) => {
  const params: GetFriendsParams = {
    page: 1,
    pageSize: 10,
    nickname: user.Nickname,
  };

  const friends = await ServerSideFriendsRoutes.getFriends(params);

  if (!friends?.length) {
    return (
      <div className="m-5 text-lg">
        {isSelf ? (
          <>
            <div>Parece que você ainda não tem nenhum amigo.</div>
            <Link href="/search" className="font-bold underline">
              <div>Clique aqui para encontrar pessoas.</div>
            </Link>
          </>
        ) : (
          `Parece que ${user.Name} ainda não tem amigos`
        )}
      </div>
    );
  }

  return <FriendshipList initialData={friends} params={params} />;
};
