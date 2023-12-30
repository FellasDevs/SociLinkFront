import Link from 'next/link';

import { Friendship } from '@/types/models/Friendship';

import { UserAvatar } from '@/components/global/UserAvatar';
import { Button, ButtonProps } from '@/components/ui/button';

type FriendshipButtonProps = ButtonProps & {
  friendship: Friendship;
  showCreatedAt?: boolean;
};

export const FriendshipButton = ({
  friendship,
  showCreatedAt,
  ...props
}: FriendshipButtonProps) => {
  return (
    <Link href={`/profile/` + friendship.Friend.Nickname} passHref>
      <Button
        className="flex h-max w-full justify-start gap-3 px-2 py-1"
        {...props}
      >
        <UserAvatar user={friendship.Friend} className="h-10 w-10" />

        <span className="truncate text-sm">{friendship.Friend.Name}</span>

        {showCreatedAt && (
          <span className="w-fit text-sm">
            Amigos desde {new Date(friendship.CreatedAt).toLocaleDateString()}
          </span>
        )}
      </Button>
    </Link>
  );
};
