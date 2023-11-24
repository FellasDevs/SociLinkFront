import { PaginationRequest, PaginationResponse } from '@/types/http/Pagination';
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
  pagination: PaginationRequest;
  query: string;
}

export type SearchPostsResponse = PaginationResponse & { Posts: Post[] };

export const PostRoutes = {
  getOwnTimeline: async (): Promise<Post[]> => {
    try {
      const { data } = await fetchClient<GetOwnTimelineResponse>('/timeline', {next: {tags: ['timeline'], revalidate: 60 * 2}});

      return data.Posts;
    } catch (e) {
      console.error(e);

      return [];
    }
  },

  getUserTimeline: async (nickname: string): Promise<GetUserTimelineResponse | null> => {
    try {
      const { data } = await  fetchClient<GetUserTimelineResponse>(`/timeline/${nickname}`, {next: {tags: [`timeline-${nickname}`], revalidate: 60 * 2}});

      return data;
    } catch (e) {
      console.error(e);

      return null;
    }
  },

  searchPosts: async ({ query, pagination }: SearchPostsParams): Promise<SearchPostsResponse | null> => {
    try {
      const { data } = await fetchClient<SearchPostsResponse>(
        `/posts/search?search=${query}&page=${pagination.page}&pageSize=${pagination.pageSize}`,
      );

      return data;
    } catch (e) {
      console.error(e);

      return null;
    }
  },
}