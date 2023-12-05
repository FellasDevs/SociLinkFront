import {Comment} from "@/types/models/Comment";

import {ClientSidePostRoutes, CreateCommentParams} from "@/http/requests/client-side/posts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
       mutationFn: async (params: CreateCommentParams) => {
           try {
               return await ClientSidePostRoutes.createComment(params);
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
                   return [ newComment, ...oldData ];
               },
           );
        },
    });
}