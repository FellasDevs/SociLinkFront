'use client';

import { useFormStatus } from 'react-dom';

import { Friendship } from '@/types/models/Friendship';
import { User } from '@/types/models/User';

import { answerFriendship, deleteFriendship, requestFriendship } from '@/actions/profile';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Props = {
    user: User | null;
    friend: User;
    friendship: Friendship | null;
}

export const FriendshipButton = ({ user, friend, friendship }: Props) => {
    if (!friendship) return (
      <form action={requestFriendship.bind(null, friend)}>
          <GetButton text='Solicitar amizade' />
      </form>
    );

    if (friendship.Accepted) return (
      <form action={async () => {
          const confirmed = confirm(`Tem certeza que deseja desfazer a sua amizade com ${friend.Name.split(' ')[0]}?`);
          if (!confirmed) return;
          await (deleteFriendship.bind(null, friendship))()
      }}>
          <GetButton text='Desfazer amizade' isRed />
      </form>
    );

    if (friendship.Friend.Id === user?.Id) return (
      <GetDropdown friendship={friendship} />
    )

    return (
      <form action={deleteFriendship.bind(null, friendship)}>
          <GetButton text='Cancelar solicitação' isRed />
      </form>
    )
}

const GetButton = ({ text, isRed }: { text: string; isRed?: boolean }) => {
    const { pending } = useFormStatus();

    return (
        <Button isLoading={pending} type='submit' variant={isRed ? 'error' : 'outline'} className='rounded-2xl'>
            {text}
        </Button>
    )
}

const GetDropdown = ({ friendship }: { friendship: Friendship }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button type='button'>
                    Responder solicitação
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem className='p-0'>
                    <form className='h-full w-full' action={answerFriendship.bind(null, friendship, true)}>
                        <Button type='submit' variant='success' className='h-full w-full'>
                            Aceitar
                        </Button>
                    </form>
                </DropdownMenuItem>

                <DropdownMenuSeparator className='my-1' />

                <DropdownMenuItem className='p-0'>
                    <form className='h-full w-full' action={answerFriendship.bind(null, friendship, false)}>
                        <Button type='submit' variant='error' className='h-full w-full'>
                            Ignorar
                        </Button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
