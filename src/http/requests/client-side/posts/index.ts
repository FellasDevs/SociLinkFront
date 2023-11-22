import { BaseResponse } from '@/types/http/BaseResponse';
import { PaginationRequest, PaginationResponse } from '@/types/http/Pagination';
import { Post } from '@/types/models/Post';

import { httpClient } from '@/http/http-client/axios';

export type SearchPostsParams = {
  pagination: PaginationRequest;
  query: string;
}

export type SearchPostsResponse = PaginationResponse & { Posts: Post[] };

export const ClientPostRoutes = {
  SearchPostsRequest: async (params: SearchPostsParams): Promise<SearchPostsResponse> => {
    try {
      const { data } = await httpClient.get<BaseResponse<SearchPostsResponse>>(
        `/posts/search/${params.query}`,
        { params: params.pagination },
      );

      return data.data;
    } catch (e) {
      console.error(e);

      return {
        Posts: [],
        Page: 1,
        PageSize: 1,
        TotalCount: 0,
      } as SearchPostsResponse;
    }
  }
}