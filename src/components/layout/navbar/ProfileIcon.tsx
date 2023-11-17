import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GetSelfRequest } from '@/http/requests/users';

export const ProfileIcon = async () => {
  const user = await GetSelfRequest()

  if (!user) return null;

  return (
    <div className='flex flex-col items-center space-x-1'>
      <Avatar>
        <AvatarImage src={user.Picture} />
        <AvatarFallback>{user.Name[0]}</AvatarFallback>
      </Avatar>

      <div className='text-xs font-bold'>{user.Name.split(' ')[0]}</div>
    </div>
  )
}