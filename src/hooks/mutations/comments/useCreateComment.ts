import { Comment } from '@/types/models/Comment';

import { ClientSidePostRoutes } from '@/http/requests/client-side/posts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
       mutationFn: ClientSidePostRoutes.createComment,
       onSuccess: (data, { postId }) => {
           if (!data?.data?.data?.Comment) return;

           const newComment = data.data.data.Comment;

           queryClient.setQueriesData(
               { queryKey: ['comments', postId] },
               (oldData?: Comment[]) => {
                   if (!oldData) return [ newComment ];
                   return [ newComment, ...oldData ];
               },
           );
        },
    });
}