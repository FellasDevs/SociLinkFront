import { PaginationRequestParams } from '@/types/http/Pagination';
import { Post } from '@/types/models/Post';
import { User } from '@/types/models/User';

import { fetchClient } from '@/http/http-client/fetch';

export type GetOwnTimelineResponse = {
  Posts: Post[];
}

export type GetUserTimelineResponse = {
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
  visibility: PostVisibility;
  images: string[];
}

export type SearchPostsResponse = { Posts: Post[] };

export const ServerSidePostRoutes = {
  getOwnTimeline: async ({ page, pageSize }: PaginationRequestParams): Promise<Post[]> => {
    try {
      const { data } = await fetchClient<GetOwnTimelineResponse>(
        `/timeline?page=${page}&pageSize=${pageSize}`,
        { next: { tags: ['timeline'], revalidate: 30 } }
      );

      return data.Posts;
    } catch (e) {
      console.error(e);

      return [];
    }
  },

  getUserTimeline: async (nickname: string): Promise<GetUserTimelineResponse | null> => {
    try {
      const { data } = await fetchClient<GetUserTimelineResponse>(
        `/timeline/${nickname}`,
        { next: { tags: [`timeline-${nickname}`], revalidate: 60 } }
      );

      return data;
    } catch (e) {
      console.error(e);

      return null;
    }
  },

  searchPosts: async ({ query, pagination: { page, pageSize } }: SearchPostsParams): Promise<SearchPostsResponse | null> => {
    try {
      const { data } = await fetchClient<SearchPostsResponse>(
        `/posts/search?search=${query}&page=${page}&pageSize=${pageSize}`,
      );

      return data;
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
}