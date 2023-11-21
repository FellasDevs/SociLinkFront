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

        if (friendship.Accepted) return {
            text: 'Desfazer amizade',
            action: async () => {
                const confirmed = confirm(`Tem certeza que deseja desfazer a sua amizade com ${friend.Name.split(' ')[0]}?`);
                if (!confirmed) return;
                await (deleteFriendship.bind(null, friendship))()
            },
        };

        const requestedByOther = friendship.Friend.Id === user?.Id;
        if (requestedByOther) return { text: 'responder', action: answerFriendship.bind(null, friendship, true) }

        return { text: 'Cancelar solicitação', action: deleteFriendship.bind(null, friendship) };
    })();

    return (
      <ErrorBoundary>
            <form action={action}>
                <GetButton text={text} isDestructive={friendship} />
            </form>
      </ErrorBoundary>
    )
}

const GetButton = ({ text, isDestructive }: { text: string; isDestructive: boolean }) => {
    const { pending } = useFormStatus();

    return (
        <Button isLoading={pending} type='submit' variant={isDestructive ? 'destructive' : 'outline'} className='rounded-2xl'>
            {text}
        </Button>
    )
}