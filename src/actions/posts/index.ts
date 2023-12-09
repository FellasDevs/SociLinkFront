'use server'

import {revalidatePath, revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';


import { CreatePostParams, EditPostParams, ServerSidePostRoutes } from '@/http/requests/server-side/posts';

export const searchPostsAction = async (basePath: string, newQueryString: string) => {
  revalidatePath(basePath, 'page');
  redirect(basePath + '?' + newQueryString)
}

export const createPostAction = async (params: CreatePostParams): Promise<string | null> => {
  const success = await ServerSidePostRoutes.createPost(params);

  if (!success) return 'Não foi possível criar a postagem';

  revalidateTag('timeline');

  return null;
}

export const editPostAction = async (params: EditPostParams): Promise<string | null> => {
  const success = await ServerSidePostRoutes.editPost(params);

  if (!success) return 'Não foi possível editar a postagem';

  revalidateTag('timeline');

  return null;
}

export const deletePostAction = async (postId: string): Promise<string | null> => {
  const success = await ServerSidePostRoutes.deletePost(postId);

  if (!success) return 'Não foi possível delete a postagem';

  revalidateTag('timeline');

  return null;
}

export const likePostAction = async (id: string) => {
  try {
    await ServerSidePostRoutes.likePost(id);

    revalidateTag('timeline');
  } catch (e) {
    console.log(e);
  }
}

export const dislikePostAction = async (id: string) => {
  try {
    await ServerSidePostRoutes.dislikePost(id);

    revalidateTag('timeline');
  } catch (e) {
    console.log(e);
  }
}