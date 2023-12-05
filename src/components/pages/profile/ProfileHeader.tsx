import {ErrorBoundary} from 'next/dist/client/components/error-boundary';
import Image from 'next/image';
import {Suspense} from 'react';

import {User} from '@/types/models/User';

import {FriendshipButton} from '@/components/pages/profile/FriendshipButton';
import {Button} from '@/components/ui/button';
import {ServerSideFriendsRoutes} from '@/http/requests/server-side/friends';
import {UserRoutes} from '@/http/requests/server-side/users';
import {UserAvatar} from "@/components/global/UserAvatar";

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

                <div className='mr-5'>
                    <div className='text-xl'>{user.Name}</div>
                    <div className='text-sm'>{user.Nickname}</div>
                </div>

                <ErrorBoundary errorComponent={FriendshipErrorFallback}>
                    <Suspense>
                        <GetFriendshipButton user={user}/>
                    </Suspense>
                </ErrorBoundary>
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

const FriendshipErrorFallback = async ({reset}: { error: Error; reset: () => void }) => {
    'use server'

    return (
        <div>
            <div>Ocorreu um erro</div>
            <Button onClick={reset}>
                Tentar novamente
            </Button>
        </div>
    )
}
