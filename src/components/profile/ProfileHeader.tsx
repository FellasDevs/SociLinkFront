import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Image from 'next/image';
import { Suspense } from 'react';

import { User } from '@/types/models/User';

import { FriendshipButton, FriendshipErrorFallback } from '@/components/profile/FriendshipButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GetFriendshipByNicknameRequest } from '@/http/requests/server-side/friendships';
import { GetSelfRequest } from '@/http/requests/server-side/users';

type Props = {
  user: User;
}

export const ProfileHeader = ({ user }: Props) => {
  return (
    <div>
      <div className='relative h-[20em] w-full bg-cyan-800'>
        { user.Banner ? <Image src={user.Banner} fill className='object-cover' alt='Profile banner' /> : null }
      </div>

      <div className='m-4 flex'>
        <Avatar className='mr-3'>
          <AvatarImage src={user.Picture} />
          <AvatarFallback>{user.Name[0]}</AvatarFallback>
        </Avatar>

        <div className='mr-5'>
            <div className='text-xl'>{user.Name}</div>
            <div className='text-sm'>{user.Nickname}</div>
        </div>

        <ErrorBoundary errorComponent={FriendshipErrorFallback}>
          <Suspense>
            <GetFriendshipButton user={user} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}

const GetFriendshipButton = async ({ user }: { user: User }) => {
  const loggedUser = await GetSelfRequest();

  if (!loggedUser || loggedUser.Id === user.Id) return null;

  const friendship = await GetFriendshipByNicknameRequest(user.Nickname);

  return <FriendshipButton user={loggedUser} friend={user} friendship={friendship} />;
}

