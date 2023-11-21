'use client';

import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { useFormStatus } from 'react-dom';

import { Friendship } from '@/types/models/Friendship';
import { User } from '@/types/models/User';

import { answerFriendship, deleteFriendship, requestFriendship } from '@/actions/profile';
import { Button } from '@/components/ui/button';

type Props = {
    user: User | null;
    friend: User;
    friendship: Friendship | null;
}

export const FriendshipButton = ({ user, friend, friendship }: Props) => {
    const { text, action } = ( (): { text: string, action: () => Promise<void> } => {
        if (!friendship) return { text: 'Solicitar amizade', action: requestFriendship.bind(null, friend) };

        if (friendship.Accepted) return { text: 'Desfazer amizade', action: deleteFriendship.bind(null, friend) };

        const requestedByOther = friendship.Friend.Id === user?.Id;

        console.log({ friendship, user })

        if (requestedByOther) return { text: 'responder', action: answerFriendship.bind(null, friend, true) }

        return { text: 'Cancelar solicitação', action: async () => {} };
    })();

    return (
      <ErrorBoundary errorComponent={({error, reset}) => <div><div>{error.message}</div><button onClick={reset}>de novo</button></div>}>
            <form action={action}>
                <GetButton text={text} />
            </form>
        </ErrorBoundary>
    )
}

const GetButton = ({ text }: { text: string }) => {
    const { pending } = useFormStatus();

    return <Button isLoading={pending} type='submit'>{text}</Button>
}