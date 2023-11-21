'use client';

import {ErrorBoundary} from 'next/dist/client/components/error-boundary';
import {useFormStatus} from 'react-dom';

import {Friendship} from '@/types/models/Friendship';
import {User} from '@/types/models/User';

import {deleteFriendship, requestFriendship} from '@/actions/profile';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

type Props = {
    user: User | null;
    friend: User;
    friendship: Friendship | null;
}

export const FriendshipButton = ({ user, friend, friendship }: Props) => {
    const { text, action, isAnswer } = ( (): { text: string, action: (formData: FormData) => Promise<void>, isAnswer?: boolean } => {
        if (!friendship) return {
            text: 'Solicitar amizade',
            action: requestFriendship.bind(null, friend),
        };

        if (friendship.Accepted) return {
            text: 'Desfazer amizade',
            action: async () => {
                const confirmed = confirm(`Tem certeza que deseja desfazer a sua amizade com ${friend.Name.split(' ')[0]}?`);
                if (!confirmed) return;
                await (deleteFriendship.bind(null, friendship))()
            },
        };

        const requestedByOther = friendship.Friend.Id === user?.Id;
        if (requestedByOther) return {
            text: 'Responder solicitação',
            action: async (data) => {
                console.log('alo', data.get('answer'));
                // await (answerFriendship.bind(null, friendship, answer))();
            },
            isAnswer: true,
        };

        return { text: 'Cancelar solicitação', action: deleteFriendship.bind(null, friendship) };
    })();

    return (
      <ErrorBoundary>
            <form action={action}>
                { isAnswer ? <GetDropdown /> : <GetButton text={text} isDestructive={friendship} /> }
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

const GetDropdown = () => {
    const { pending, data } = useFormStatus();

    data?.set('answer', true)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button isLoading={pending} type='button' variant='secondary' className='bg-green-600 text-white'>
                    Responder solicitação
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLabel>Resposta</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <Button type='submit' variant='ghost' className='h-full w-full'>
                        Aceitar
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button type='submit' variant='ghost' className='h-full w-full'>
                        Ignorar
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}