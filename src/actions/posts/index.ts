'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  CreatePostParams,
  EditPostParams,
  ServerSidePostRoutes,
} from '@/http/requests/server-side/posts';
import {
  DeleteObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'node:crypto';

export type EditPostActionParams = EditPostParams & {
  lastPictures?: string[];
};

export const searchPostsAction = async (
  basePath: string,
  newQueryString: string
) => {
  revalidatePath(basePath, 'page');
  redirect(basePath + '?' + newQueryString);
};

const sendImagesToAws = async (
  images: string[]
): Promise<{ images: string[]; error?: string }> => {
  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.S3_REGION,
  });

  const imageNames = Array.from(
    { length: images.length },
    () => randomUUID().toString() + '.jpg'
  );

  try {
    await Promise.all(
      images.map(async (file, i) => {
        await client.send(
          new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: 'post-images/' + imageNames[i],
            Body: file,
            ACL: 'public-read',
          })
        );
      })
    );

    return {
      images: imageNames.map(
        (name) =>
          `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/post-images/${name}`
      ),
    };
  } catch (err) {
    console.error(err);
    return { images: [], error: 'Erro ao enviar a imagem' };
  }
};

const deleteImagesFromAws = async (images: string[]): Promise<string> => {
  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.S3_REGION,
  });

  try {
    await client.send(
      new DeleteObjectsCommand({
        Bucket: process.env.S3_BUCKET,
        Delete: {
          Objects: images.map((image) => ({
            Key: 'post-images/' + image.split('/').toSpliced(-1),
          })),
        },
      })
    );

    return '';
  } catch (err) {
    console.error(err);
    return 'Erro ao deletar as imagens antigas';
  }
};

export const createPostAction = async (
  params: CreatePostParams
): Promise<string | null> => {
  const imageUrls: string[] = [];

  if (params.images?.length) {
    const { images, error } = await sendImagesToAws(params.images);

    if (error) return error;

    if (images.some((image) => !!image)) {
      imageUrls.push(...images);
    }
  }

  const success = await ServerSidePostRoutes.createPost({
    ...params,
    images: imageUrls,
  });

  if (!success) return 'Não foi possível criar a postagem';

  revalidateTag('timeline');

  return null;
};

export const editPostAction = async ({
  lastPictures,
  ...params
}: EditPostActionParams): Promise<string | null> => {
  const imageUrls: string[] = [];

  if (params.images?.length) {
    if (lastPictures) {
      const error = await deleteImagesFromAws(lastPictures);

      if (error) return error;
    }

    const { images, error } = await sendImagesToAws(params.images);

    if (error) return error;

    if (images.some((image) => !!image)) {
      imageUrls.push(...images);
    }
  }

  const success = await ServerSidePostRoutes.editPost({
    ...params,
    images: imageUrls,
  });

  if (!success) return 'Não foi possível editar a postagem';

  revalidateTag('timeline');

  return null;
};

export const deletePostAction = async (
  postId: string
): Promise<string | null> => {
  const success = await ServerSidePostRoutes.deletePost(postId);

  if (!success) return 'Não foi possível delete a postagem';

  revalidateTag('timeline');

  return null;
};

export const likePostAction = async (id: string) => {
  try {
    await ServerSidePostRoutes.likePost(id);

    revalidateTag('timeline');
  } catch (e) {
    console.log(e);
  }
};

export const dislikePostAction = async (id: string) => {
  try {
    await ServerSidePostRoutes.dislikePost(id);

    revalidateTag('timeline');
  } catch (e) {
    console.log(e);
  }
};
