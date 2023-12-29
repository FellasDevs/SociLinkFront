'use server';

import Image from 'next/image';
import { Suspense } from 'react';

import { User } from '@/types/models/User';

import { UserAvatar } from '@/components/global/UserAvatar';
import { FriendshipButton } from '@/components/pages/profile/FriendshipButton';
import { UserName } from '@/components/pages/profile/UserName';
import { ServerSideFriendsRoutes } from '@/http/requests/server-side/friends';
import { UserWithFriendsCount } from '@/http/requests/server-side/posts';
import { UserRoutes } from '@/http/requests/server-side/users';

type Props = {
  user: UserWithFriendsCount;
};

export const ProfileHeader = async ({ user }: Props) => {
  const loggedUser = await UserRoutes.getSelf();

  const canEdit = loggedUser?.Id === user.Id;

  return (
    <div>
      <div className="relative h-[20em] w-full bg-cyan-800">
        {user.Banner ? (
          <Image
            src={user.Banner}
            fill
            className="object-cover"
            alt="Profile banner"
          />
        ) : null}
      </div>

      <div className="m-4 flex items-center gap-2">
        <UserAvatar user={user} />

        <div className="mr-2">
          <UserName userName={user.Name} canEdit={canEdit} />
          <div>{user.Nickname}</div>
        </div>

        <Suspense>
          <GetFriendshipButton user={user} />
        </Suspense>
      </div>
    </div>
  );
};

const GetFriendshipButton = async ({ user }: { user: User }) => {
  const loggedUser = await UserRoutes.getSelf();

  if (!loggedUser || loggedUser.Id === user.Id) return null;

  const friendship = await ServerSideFriendsRoutes.getFriendshipByNickname(
    user.Nickname
  );

  return (
    <FriendshipButton user={loggedUser} friend={user} friendship={friendship} />
  );
};
