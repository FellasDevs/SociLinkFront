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
      <Button className="flex h-max w-full gap-1 px-2 py-1" {...props}>
        <UserAvatar user={friendship.Friend} />

        <span className="mx-auto truncate text-lg">
          {friendship.Friend.Name}
        </span>

        {showCreatedAt && (
          <span>
            Amigos desde {new Date(friendship.CreatedAt).toLocaleDateString()}
          </span>
        )}
      </Button>
    </Link>
  );
};
