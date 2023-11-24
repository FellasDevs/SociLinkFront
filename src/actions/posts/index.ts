'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const searchPostsAction = async (basePath: string, newQueryString: string) => {
  revalidatePath(basePath, 'page');
  redirect(basePath + '?' + newQueryString)
}