import { PaginationRequestParams } from '@/types/http/Pagination';
import { Post } from '@/types/models/Post';
import { User } from '@/types/models/User';

import { fetchClient } from '@/http/http-client/fetch';

export type GetHomeTimelineParams = PaginationRequestParams;

export type GetHomeTimelineResponse = {
  Posts: Post[];
}

export type GetProfileTimelineParams = PaginationRequestParams & {
  nickname: string;
}

export type GetProfileTimelineResponse = {
  Posts: Post[];
  User: User;
}

export type SearchPostsParams = {
  pagination: PaginationRequestParams;
  query: string;
}

export type PostVisibility = 'public' | 'friends' | 'private';

export type CreatePostParams = {
  content: string;
  originalPostId?: string;
  visibility: PostVisibility;
  images: string[];
}

export type EditPostParams = CreatePostParams & { id: string };

export type SearchPostsResponse = { Posts: Post[] };

export const ServerSidePostRoutes = {
  getOwnTimeline: async ({ page, pageSize }: GetHomeTimelineParams): Promise<Post[] | null> => {
    try {
      const { data } = await fetchClient<GetHomeTimelineResponse>(
        `/timeline?page=${page}&pageSize=${pageSize}`,
        { next: { tags: ['timeline'], revalidate: 30 } }
      );

      return data.Posts;
    } catch (e) {
      console.error(e);

      return null;
    }
  },

  getUserTimeline: async ({ nickname, page, pageSize }: GetProfileTimelineParams): Promise<GetProfileTimelineResponse | null> => {
    try {
      const { data } = await fetchClient<GetProfileTimelineResponse>(
        `/timeline/${nickname}?page=${page}&pageSize=${pageSize}`,
        { next: { tags: ['timeline', nickname], revalidate: 60 * 2 } }
      );

      return data;
    } catch (e) {
      console.error(e);

      return null;
    }
  },

  searchPosts: async ({ query, pagination: { page, pageSize } }: SearchPostsParams): Promise<Post[] | null> => {
    try {
      const { data } = await fetchClient<SearchPostsResponse>(
        `/posts/search?search=${query}&page=${page}&pageSize=${pageSize}`,
      );

      return data.Posts;
    } catch (e) {
      console.error(e);

      return null;
    }
  },

  createPost: async (params: CreatePostParams): Promise<boolean> => {
    try {
      const response = await fetchClient<Post>('/posts', {
        method: 'POST',
        body: JSON.stringify(params),
      });

      return response.success;
    } catch (e) {
      console.error(e);

      return false;
    }
  },

  editPost: async (params: EditPostParams): Promise<boolean> => {
    try {
      const response = await fetchClient<Post>('/posts', {
        method: 'PUT',
        body: JSON.stringify(params),
      });

      return response.success;
    } catch (e) {
      console.error(e);

      return false;
    }
  },

  deletePost: async (postId: string): Promise<boolean> => {
    try {
      await fetchClient(`/posts/${postId}`, { method: 'DELETE' });

      return true;
    } catch (e) {
      console.error(e);

      return false;
    }
  },

  likePost: async (postId: string) => {
    await fetchClient(`/posts/like/${postId}`, { method: 'POST' });
  },

  dislikePost: async (postId: string) => {
    await fetchClient(`/posts/like/${postId}`, { method: 'DELETE' });
  },
}