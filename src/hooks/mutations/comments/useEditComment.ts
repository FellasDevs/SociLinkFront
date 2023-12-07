import { Comment } from '@/types/models/Comment';

import { ClientSidePostRoutes } from '@/http/requests/client-side/posts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ClientSidePostRoutes.editComment,
        onSuccess: (data) => {
            if (!data?.data?.data?.Comment) return;

            const newComment = data.data.data.Comment;

            queryClient.setQueriesData(
                { queryKey: ['comments'] },
                (oldData?: Comment[]) => {
                    if (!oldData) return [ newComment ];

                    return oldData.map((comment) =>
                      comment.Id === newComment.Id ? newComment : comment);
                },
            );
        },
    });
}