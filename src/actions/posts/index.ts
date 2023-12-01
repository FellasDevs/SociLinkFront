'use server'

import {revalidatePath, revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';

import {
  CreateCommentParams,
  CreatePostParams,
  EditCommentParams,
  ServerSidePostRoutes
} from '@/http/requests/server-side/posts';

export const searchPostsAction = async (basePath: string, newQueryString: string) => {
  revalidatePath(basePath, 'page');
  redirect(basePath + '?' + newQueryString)
}

export const createPostAction = async (params: CreatePostParams): Promise<string | null> => {
  const createdPost = await ServerSidePostRoutes.createPost(params);

  if (!createdPost) return 'Não foi possível criar a postagem';

  revalidateTag('timeline');

  return null;
}

export const createCommentAction = async (params: CreateCommentParams): Promise<string | null> => {
  try {
    await ServerSidePostRoutes.createComment(params);

    revalidateTag(`comments-${params.postId}`);

    return null;
  } catch (e) {
    console.log(e);

    return 'Ocorreu um erro ao tentar criar o comentário';
  }
}

export const editCommentAction = async (postId: string, params: EditCommentParams) => {
  try {
    await ServerSidePostRoutes.editComment(params);

    revalidateTag(`comments-${postId}`);
  } catch (e) {
    console.log(e);
  }
}

export const deleteCommentAction = async (postId: string, commentId: string) => {
  try {
    await ServerSidePostRoutes.deleteComment(commentId);

    revalidateTag(`comments-${postId}`);
  } catch (e) {
    console.log(e);
  }
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