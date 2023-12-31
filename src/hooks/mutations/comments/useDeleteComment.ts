import { Comment } from '@/types/models/Comment';

import { ClientSidePostRoutes } from '@/http/requests/client-side/posts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ClientSidePostRoutes.deleteComment,
        onSuccess: (_data, commentId) => {
            queryClient.setQueriesData(
                { queryKey: ['comments'] },
                (oldData?: Comment[]) => {
                    if (!oldData) return [];

                    return oldData.filter((comment) => comment.Id !== commentId);
                },
            );
        },
    });
}