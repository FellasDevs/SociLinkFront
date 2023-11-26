import { BaseResponse } from '@/types/http/BaseResponse';
import { Friendship } from '@/types/models/Friendship';

import { httpClient } from '@/http/http-client/axios';
import {
  GetFriendshipRequestsParams,
  GetFriendshipRequestsResponse,
  GetFriendsParams,
  GetFriendsResponse,
} from '@/http/requests/server-side/friends';

export const ClientSideFriendsRoutes = {
  getFriends: async (params: GetFriendsParams): Promise<Friendship[] | null> => {
    try {
      const { data } = await httpClient<BaseResponse<GetFriendsResponse>>(
        '/friendships',
        { params },
      );

      return data.data.Friends;
    } catch (e) {
      console.error(e);

      return null;
    }
  },

  getFriendshipRequests: async (params: GetFriendshipRequestsParams): Promise<Friendship[] | null> => {
    try {
      const { data } = await httpClient<BaseResponse<GetFriendshipRequestsResponse>>(
        '/friendships/requests',
        { params },
      );

      return data.data.Requests;
    } catch (e) {
      console.error(e);

      return null;
    }
  },
}