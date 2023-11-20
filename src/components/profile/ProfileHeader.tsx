import Image from 'next/image';

import { User } from '@/types/models/User';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  user: User;
}

export const ProfileHeader = ({ user }: Props) => {
  return (
    <div>
      <div className='h-[5em] w-full bg-primary'>
        <Image src={user.Banner} alt='Profile banner' />
      </div>

      <div className='m-3 flex gap-2'>
        <Avatar>
          <AvatarImage src={user.Picture} />
          <AvatarFallback>{user.Name[0]}</AvatarFallback>
        </Avatar>

        <div>
          <div className='text-xl'>{user.Name}</div>
          <div className='text-sm'>{user.Nickname}</div>
        </div>
      </div>
    </div>
  )
}