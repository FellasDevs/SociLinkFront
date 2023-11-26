import { BaseResponse } from '@/types/http/BaseResponse';
import { Post } from '@/types/models/Post';

import { httpClient } from '@/http/http-client/axios';
import {
  GetHomeTimelineParams,
  GetHomeTimelineResponse,
  GetProfileTimelineParams,
  GetProfileTimelineResponse,
} from '@/http/requests/server-side/posts';

export const ClientSidePostRoutes = {
  getHomeTimeline: async (params: GetHomeTimelineParams): Promise<Post[] | null> => {
    try {
      const { data } = await httpClient.get<BaseResponse<GetHomeTimelineResponse>>(
        '/timeline',
        { params },
      );

      return data.data.Posts;
    } catch (e) {
      console.error(e);

      return null;
    }
  },

  getProfileTimeline: async ({ nickname, ...params }: GetProfileTimelineParams): Promise<GetProfileTimelineResponse | null> => {
    try {
      const { data } = await httpClient.get<BaseResponse<GetProfileTimelineResponse>>(
        `/timeline/${nickname}`,
        { params },
      );

      return data.data;
    } catch (e) {
      console.error(e);

      return null;
    }
  },
}