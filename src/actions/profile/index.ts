'use server';

import { revalidateTag } from 'next/cache';

import { Friendship } from '@/types/models/Friendship';
import { User } from '@/types/models/User';

import { ServerSideFriendsRoutes } from '@/http/requests/server-side/friends';
import { EditUserParams, UserRoutes } from '@/http/requests/server-side/users';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'node:crypto';

export const requestFriendshipAction = async (friend: User) => {
  await ServerSideFriendsRoutes.requestFriendship(friend.Id);
  revalidateTag(`friendship-${friend.Nickname}`);
};

export const deleteFriendshipAction = async (friendship: Friendship) => {
  await ServerSideFriendsRoutes.deleteFriendship(friendship.Id);
  revalidateTag(`friendship-${friendship.Friend.Nickname}`);
  revalidateTag('friendships');
};

export const answerFriendshipAction = async (
  friendship: Friendship,
  accepted: boolean
) => {
  await ServerSideFriendsRoutes.answerFriendshipRequest({
    requestId: friendship.Id,
    answer: accepted,
  });
  revalidateTag(`friendship-${friendship.Friend.Nickname}`);
  revalidateTag('friendships');
  revalidateTag('friendship-requests');
};

export const editUserAction = async (params: EditUserParams) => {
  await UserRoutes.editUser(params);
  revalidateTag('get-self');
  revalidateTag('timeline');
};

const sendImageToAws = async (
  formData: FormData,
  lastPicture: string,
  folderName: string,
  update: (newImageName: string) => Promise<void>
): Promise<string> => {
  const inputData = formData.get('file-input') as File;

  if (!inputData || inputData.size === 0) return 'Nenhum arquivo selecionado';

  if (inputData.size > 2000000) return 'Imagem muito grande! (Máximo de 2MB)';

  const arrayBuffer = await inputData.arrayBuffer();
  const file = new Uint8Array(arrayBuffer);

  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.S3_REGION,
  });

  const newImageName = randomUUID().toString() + '.jpg';

  try {
    if (!!lastPicture) {
      await client.send(
        new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: folderName + '/' + lastPicture.split('/').slice(-1),
        })
      );
    }

    await client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: folderName + '/' + newImageName,
        Body: file,
        ACL: 'public-read',
      })
    );

    await update(newImageName);

    return '';
  } catch (err) {
    console.error(err);
    return 'Erro ao enviar a imagem';
  }
};

export const sendProfilePictureAction = async (
  formData: FormData,
  lastPicture: string
): Promise<string> => {
  return await sendImageToAws(
    formData,
    lastPicture,
    'profile-pictures',
    async (newImageName) => {
      await editUserAction({
        picture: `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/profile-pictures/${newImageName}`,
      });
    }
  );
};

export const sendBannerPictureAction = async (
  formData: FormData,
  lastPicture: string
): Promise<string> => {
  return await sendImageToAws(
    formData,
    lastPicture,
    'banners',
    async (newImageName) => {
      await editUserAction({
        banner: `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/banners/${newImageName}`,
      });
    }
  );
};
