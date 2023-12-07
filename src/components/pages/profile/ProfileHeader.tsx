'use server'

import Image from 'next/image';
import {Suspense} from 'react';

import {User} from '@/types/models/User';

import {FriendshipButton} from '@/components/pages/profile/FriendshipButton';
import {ServerSideFriendsRoutes} from '@/http/requests/server-side/friends';
import {UserRoutes} from '@/http/requests/server-side/users';
import {UserAvatar} from "@/components/global/UserAvatar";
import {UserName} from "@/components/pages/profile/UserName";

type Props = {
    user: User;
}

export const ProfileHeader = ({user}: Props) => {
    return (
        <div>
            <div className='relative h-[20em] w-full bg-cyan-800'>
                {user.Banner ? <Image src={user.Banner} fill className='object-cover' alt='Profile banner'/> : null}
            </div>

            <div className='m-4 gap-2 items-center flex'>
                <UserAvatar user={user}/>

                <div className='mr-2'>
                    <UserName userName={user.Name}/>

                    <div className='text-sm'>{user.Nickname}</div>
                </div>

                <Suspense>
                    <GetFriendshipButton user={user}/>
                </Suspense>
            </div>
        </div>
    )
}

const GetFriendshipButton = async ({user}: { user: User }) => {
    const loggedUser = await UserRoutes.getSelf();

    if (!loggedUser || loggedUser.Id === user.Id) return null;

    const friendship = await ServerSideFriendsRoutes.getFriendshipByNickname(user.Nickname);

    return <FriendshipButton user={loggedUser} friend={user} friendship={friendship}/>;
}