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

export type GetPostCommentsResponse = BaseResponse<{ Comments: Comment[] }>;

export type CreateCommentParams = {
  postId: string;
  content: string;
};

export type CreateCommentResponse = BaseResponse<{ Comment: Comment }>;

export type EditCommentParams = {
  commentId: string;
  content: string;
};

export type EditCommentResponse = BaseResponse<{ Comment: Comment }>;

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
      const { data } = await httpClient.get<GetPostCommentsResponse>(
          '/comments',
          { params },
      );

      return data.data.Comments;
    } catch (e) {
      console.error(e);

      return null;
    }
  },

  createComment: async (params: CreateCommentParams) => {
    return httpClient.post<CreateCommentResponse>(
        '/comments',
        params,
    );
  },

  editComment: async ({ commentId, content }: EditCommentParams) => {
    return httpClient.put<EditCommentResponse>(
        `/comments/${commentId}`,
        { content },
    );
  },

  deleteComment: async (commentId: string) => {
    return httpClient.delete(`/comments/${commentId}`);
  },
}