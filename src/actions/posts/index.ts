'use server'

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { CreatePostParams, PostRoutes } from '@/http/requests/server-side/posts';

export const searchPostsAction = async (basePath: string, newQueryString: string) => {
  revalidatePath(basePath, 'page');
  redirect(basePath + '?' + newQueryString)
}

export const createPostAction = async (params: CreatePostParams) => {
  const createdPost = await PostRoutes.createPost(params);

  if (!createdPost) return;

  revalidateTag('timeline');
  // revalidatePath('/', 'page');
  // revalidatePath('/timeline', 'page');
}