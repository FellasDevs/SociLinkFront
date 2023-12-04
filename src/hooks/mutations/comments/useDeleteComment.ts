import {Comment} from "@/types/models/Comment";

import {ClientSidePostRoutes} from "@/http/requests/client-side/posts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useDeleteComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (commentId: string) => {
            try {
                return await ClientSidePostRoutes.deleteComment(commentId);
            } catch (e) {
                console.error(e);
            }
        },
        onSuccess: (_data, commentId) => {
            queryClient.setQueriesData(
                { queryKey: ['comments'] },
                (oldData?: Comment[]) => {
                    if (!oldData) return [];

                    const oldCommentIndex = oldData.findIndex((comment) => comment.Id === commentId)

                    if (oldCommentIndex !== -1) oldData.splice(oldCommentIndex, 1);

                    return oldData;
                },
            );
        },
    });
}