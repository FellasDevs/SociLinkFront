import Link from 'next/link';
import { Suspense } from 'react';

import { User } from '@/types/models/User';

import {
  sendBannerPictureAction,
  sendProfilePictureAction,
} from '@/actions/profile';
import { UserAvatar } from '@/components/global/UserAvatar';
import { FriendshipRequestButton } from '@/components/pages/profile/FriendshipRequestButton';
import {
  ImageUploadModal,
  ImageUploadModalProps,
} from '@/components/pages/profile/ImageUploadModal';
import { ProfileBanner } from '@/components/pages/profile/ProfileBanner';
import { UserName } from '@/components/pages/profile/UserName';
import { Button } from '@/components/ui/button';
import { ServerSideFriendsRoutes } from '@/http/requests/server-side/friends';
import { UserWithFriendsCount } from '@/http/requests/server-side/posts';
import { UserRoutes } from '@/http/requests/server-side/users';

type Props = {
  user: UserWithFriendsCount;
};

export const ProfileHeader = async ({ user }: Props) => {
  const loggedUser = await UserRoutes.getSelf();

  const canEdit = loggedUser?.Id === user.Id;

  const profilePicAction = async (formData: FormData) => {
    'use server';
    return await sendProfilePictureAction(formData, user.Picture);
  };

  const bannerAction = async (formData: FormData) => {
    'use server';
    return await sendBannerPictureAction(formData, user.Banner);
  };

  return (
    <div>
      <GetImageUploadModal
        title="Enviar foto de perfil"
        canEdit={canEdit}
        action={bannerAction}
      >
        <ProfileBanner banner={user.Banner} />
      </GetImageUploadModal>

      <div className="mx-6 my-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GetImageUploadModal
            title="Enviar imagem do banner"
            canEdit={canEdit}
            action={profilePicAction}
          >
            <UserAvatar user={user} className="h-16 w-16" />
          </GetImageUploadModal>

          <div className="mr-2">
            <UserName userName={user.Name} canEdit={canEdit} />
            <div>{user.Nickname}</div>
          </div>

          <Suspense>
            <GetFriendshipButton user={user} />
          </Suspense>
        </div>

        <Link href={'/friends/' + user.Nickname} passHref>
          <Button variant="outline">Amizades: {user.FriendsCount}</Button>
        </Link>
      </div>
    </div>
  );
};

const GetFriendshipButton = async ({ user }: { user: User }) => {
  const loggedUser = await UserRoutes.getSelf();

  if (!loggedUser || loggedUser.Id === user.Id) return null;

  const friendship = await ServerSideFriendsRoutes.getFriendshipByNickname(
    user.Nickname
  );

  return (
    <FriendshipRequestButton
      user={loggedUser}
      friend={user}
      friendship={friendship}
    />
  );
};

const GetImageUploadModal = ({
  canEdit,
  children,
  action,
  title,
}: ImageUploadModalProps & {
  canEdit: boolean;
}) => {
  if (!canEdit) return children;

  return (
    <ImageUploadModal action={action} title={title}>
      <div className="cursor-pointer hover:opacity-70">{children}</div>
    </ImageUploadModal>
  );
};
