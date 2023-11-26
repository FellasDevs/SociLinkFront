import { BaseResponse } from '@/types/http/BaseResponse';
import { PaginationRequestParams } from '@/types/http/Pagination';
import { Post } from '@/types/models/Post';

import { httpClient } from '@/http/http-client/axios';
import { GetOwnTimelineResponse } from '@/http/requests/server-side/posts';

export const ClientSidePostRoutes = {
  getOwnTimeline: async (params: PaginationRequestParams): Promise<Post[]> => {
    try {
      const { data } = await httpClient.get<BaseResponse<GetOwnTimelineResponse>>(
        '/timeline',
        { params },
      );

      return data.data.Posts;
    } catch (e) {
      console.error(e);

      return [];
    }
  },
}