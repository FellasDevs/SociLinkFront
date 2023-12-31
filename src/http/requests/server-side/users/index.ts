import { PaginationRequestParams } from '@/types/http/Pagination';
import { User } from '@/types/models/User';

import { fetchClient } from '@/http/http-client/fetch';

type GetUserResponse = {
  User: User;
};

export type SearchUsersParams = {
  pagination: PaginationRequestParams;
  query: string;
};

export type EditUserParams = {
  name?: string;
  nickname?: string;
  birthdate?: Date;
  picture?: string;
  banner?: string;
};

export type SearchUsersResponse = { Users: User[] };

export const UserRoutes = {
  getSelf: async (): Promise<User | null> => {
    try {
      const { data } = await fetchClient<GetUserResponse>('/users/self', {
        next: { tags: ['get-self'], revalidate: 60 * 5 },
      });

      return data.User;
    } catch (e) {
      console.error(e);

      return null;
    }
  },

  getUserByNickname: async (nickname: string): Promise<User | null> => {
    try {
      const { data } = await fetchClient<GetUserResponse>(
        `/users?nickname=${nickname}`,
        {
          next: {
            tags: ['get-user-by-nickname', nickname],
            revalidate: 60 * 5,
          },
        }
      );

      return data.User;
    } catch (e) {
      console.error(e);

      return null;
    }
  },

  searchUsers: async ({
    query,
    pagination,
  }: SearchUsersParams): Promise<User[] | null> => {
    try {
      const { data } = await fetchClient<SearchUsersResponse>(
        `/users/search?search=${query}&page=${pagination.page}&pageSize=${pagination.pageSize}`
      );

      return data.Users;
    } catch (e) {
      console.error(e);

      return null;
    }
  },

  editUser: async (params: EditUserParams) => {
    try {
      await fetchClient('/users/self', {
        method: 'PUT',
        body: JSON.stringify(params),
      });
    } catch (e) {
      console.error(e);
    }
  },
};
