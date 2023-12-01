import {BaseResponse} from '@/types/http/BaseResponse';
import {PaginationRequestParams} from "@/types/http/Pagination";
import {Comment} from "@/types/models/Comment";
import {Post} from '@/types/models/Post';

import {httpClient} from '@/http/http-client/axios';
import {
  GetHomeTimelineParams,
  GetHomeTimelineResponse, 
  GetProfileTimelineParams,
  GetProfileTimelineResponse,
} from '@/http/requests/server-side/posts';

export type GetPostCommentsParams = PaginationRequestParams & { postId: string };

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

  getPostComments: async (params: GetPostCommentsParams): Promise<Comment[] | null> => {
    try {
      const { data } = await httpClient.get<BaseResponse<Comment[]>>(
          '/comments',
          { params },
      );

      return data.data;
    } catch (e) {
      console.error(e);

      return null;
    }
  },
}