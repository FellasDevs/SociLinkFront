import { PaginationRequestParams } from '@/types/http/Pagination';
import { Friendship } from '@/types/models/Friendship';

import { fetchClient } from '@/http/http-client/fetch';

export type AnswerFriendshipParams = {
  requestId: string;
  answer: boolean;
};

export type GetFriendsParams = PaginationRequestParams & {
  nickname?: string;
};

export type GetFriendsResponse = { Friends: Friendship[] };

export type GetFriendshipRequestsParams = PaginationRequestParams;

export type GetFriendshipRequestsResponse = { Requests: Friendship[] };

export type GetFriendshipByNicknameResponse = { Friendship: Friendship };

export const ServerSideFriendsRoutes = {
  getFriends: async ({
    page,
    pageSize,
    nickname = '',
  }: GetFriendsParams): Promise<Friendship[] | null> => {
    try {
      const { data } = await fetchClient<GetFriendsResponse>(
        `/friendships?nickname=${nickname}&page=${page}&pageSize=${pageSize}`,
        { next: { tags: ['friendships'], revalidate: 60 * 2 } }
      );

      return data.Friends;
    } catch (e) {
      console.error(e);

      return null;
    }
  },

  getFriendshipRequests: async ({
    page,
    pageSize,
  }: GetFriendshipRequestsParams): Promise<Friendship[] | null> => {
    try {
      const { data } = await fetchClient<GetFriendshipRequestsResponse>(
        `/friendships/requests?page=${page}&pageSize=${pageSize}`,
        { next: { tags: ['friendship-requests'] } }
      );

      return data.Requests;
    } catch (e) {
      console.error(e);

      return null;
    }
  },

  getFriendshipByNickname: async (
    nickname: string
  ): Promise<Friendship | null> => {
    try {
      const { data } = await fetchClient<GetFriendshipByNicknameResponse>(
        `/friendships/${nickname}`,
        { next: { tags: [`friendship-${nickname}`] } }
      );

      return data.Friendship;
    } catch (e) {
      console.error(e);

      return null;
    }
  },

  requestFriendship: async (id: string) => {
    try {
      await fetchClient(`/friendships/requests/${id}`, { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
  },

  answerFriendshipRequest: async (props: AnswerFriendshipParams) => {
    try {
      await fetchClient('/friendships/requests', {
        method: 'PUT',
        body: JSON.stringify(props),
      });
    } catch (e) {
      console.error(e);
      // throw new Error('Ocorreu um erro ao tentar realizar a solicitação de amizade')
    }
  },

  deleteFriendship: async (friendshipId: string) => {
    try {
      await fetchClient(`/friendships/${friendshipId}`, { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }
  },
};
