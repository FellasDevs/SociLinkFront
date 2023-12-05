import {Comment} from "@/types/models/Comment";

import {ClientSidePostRoutes, EditCommentParams} from "@/http/requests/client-side/posts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useEditComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (params: EditCommentParams) => {
            try {
                return await ClientSidePostRoutes.editComment(params);
            } catch (e) {
                console.error(e);
            }
        },
        onSuccess: (data) => {
            if (!data?.data?.data?.Comment) return;

            const newComment = data.data.data.Comment;

            queryClient.setQueriesData(
                { queryKey: ['comments'] },
                (oldData?: Comment[]) => {
                    if (!oldData) return [ newComment ];

                    const oldCommentIndex = oldData.findIndex((comment) => comment.Id === newComment.Id)

                    if (oldCommentIndex !== -1)
                        oldData[oldCommentIndex] = newComment;

                    return oldData;
                },
            );
        },
    });
}