import Image from 'next/image';
import { Suspense } from 'react';

import { User } from '@/types/models/User';

import { FriendshipButton } from '@/components/profile/FriendshipButton';
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

      <div className='m-3 flex gap-2'>
        <Avatar>
          <AvatarImage src={user.Picture} />
          <AvatarFallback>{user.Name[0]}</AvatarFallback>
        </Avatar>

        <div className='flex'>
            <div>
                <div className='text-xl'>{user.Name}</div>
                <div className='text-sm'>{user.Nickname}</div>
            </div>

            <Suspense>
                <GetFriendshipButton user={user} />
            </Suspense>
        </div>
      </div>
    </div>
  )
}

const GetFriendshipButton = async ({ user }: { user: User }) => {
  const loggedUser = await GetSelfRequest();

  if (!loggedUser || loggedUser.Id === user.Id) return null;

  const friendship = await GetFriendshipByNicknameRequest(user.Nickname);

  console.log(friendship)

  return <FriendshipButton user={loggedUser} friend={user} friendship={friendship} />;
}

