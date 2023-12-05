import {Comment} from "@/types/models/Comment";

import {ClientSidePostRoutes, GetPostCommentsParams} from "@/http/requests/client-side/posts";
import {useQuery} from "@tanstack/react-query";

export const usePostComments = (params: GetPostCommentsParams) => {
    return useQuery({
        queryKey: ['comments', params.postId],
        queryFn: async (): Promise<Comment[]> => {
            const response = await ClientSidePostRoutes.getPostComments(params);

            return response ?? [];
        },
    });
}