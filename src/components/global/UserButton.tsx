import Link from 'next/link';

import { User } from '@/types/models/User';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, ButtonProps } from '@/components/ui/button';

type Props = ButtonProps & {
  user: User;
  showFirstNameOnly?: boolean;
}

export const UserButton = ({ user, showFirstNameOnly, ...props }: Props) => {
  const name = showFirstNameOnly ? user.Name.split(' ')[0] : user.Name;

  return (
    <Link href={`/profile/` + user.Nickname} passHref>
      <Button className='flex h-max w-full gap-1 px-2 py-1' {...props}>
        <Avatar>
          <AvatarImage src={user.Picture} />
          <AvatarFallback>{user.Name.split(' ')[0]}</AvatarFallback>
        </Avatar>

        <span className='mx-auto truncate text-lg'>
          {name}
        </span>
      </Button>
    </Link>
  )
}