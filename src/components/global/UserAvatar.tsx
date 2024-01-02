import { User as user } from '@/types/models/User';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { UserCircle } from 'lucide-react';

type Props = {
  user: user;
  className?: string;
};

export const UserAvatar = ({ user, className = '' }: Props) => {
  return (
    <Avatar className={className}>
      {user.Picture ? (
        <AvatarImage src={user.Picture} alt={'Foto de ' + user.Nickname} />
      ) : (
        <UserCircle size="md" />
      )}
    </Avatar>
  );
};
