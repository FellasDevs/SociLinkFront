import Image from 'next/image';

import { User } from '@/types/models/User';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

        <div>
          <div className='text-xl'>{user.Name}</div>
          <div className='text-sm'>{user.Nickname}</div>
        </div>
      </div>
    </div>
  )
}