import Link from 'next/link';

import { User } from '@/types/models/User';

import { UserAvatar } from '@/components/global/UserAvatar';
import { Button, ButtonProps } from '@/components/ui/button';

type UserButtonProps = ButtonProps & {
  user: User;
  showFirstNameOnly?: boolean;
};

export const UserButton = ({
  user,
  showFirstNameOnly,
  ...props
}: UserButtonProps) => {
  const name = showFirstNameOnly ? user.Name.split(' ')[0] : user.Name;

  return (
    <Link href={`/profile/` + user.Nickname} passHref>
      <Button
        className="flex h-max w-full justify-start gap-3 px-2 py-1"
        {...props}
      >
        <UserAvatar user={user} className="h-12 w-12" />

        <span className="truncate">{name}</span>
      </Button>
    </Link>
  );
};
