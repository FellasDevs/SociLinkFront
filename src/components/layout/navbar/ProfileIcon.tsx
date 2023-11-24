import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRoutes } from '@/http/requests/server-side/users';

export const ProfileIcon = async () => {
  const user = await UserRoutes.getSelf()

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