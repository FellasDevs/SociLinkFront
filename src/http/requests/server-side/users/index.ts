import { PaginationRequest, PaginationResponse } from '@/types/http/Pagination';
import { User } from '@/types/models/User';

import { fetchClient } from '@/http/http-client/fetch';

type GetSelfResponse = {
  User: User;
}

export type SearchUsersParams = {
  pagination: PaginationRequest;
  query: string;
}

export type SearchUsersResponse = PaginationResponse & { Users: User[] }

export const UserRoutes = {
  getSelf: async () => {
    try {
      const { data } = await fetchClient<GetSelfResponse>('/users/self', { next: { tags: ['getSelf'], revalidate: 60 * 10 }});

      return data.User;
    } catch (e) {
      return null;
    }
  },

  searchUsers: async ({ query, pagination }: SearchUsersParams): Promise<SearchUsersResponse | null> => {
    try {
      const { data } = await fetchClient<SearchUsersResponse>(
        `/users/search?search=${query}&page=${pagination.page}&pageSize=${pagination.pageSize}`,
      );

      return data;
    } catch (e) {
      console.error(e);

      return null;
    }
  },
}
