import {ReactNode} from "react";

import {LoaderWithText} from "@/components/global/Loader";
import {CommentCard} from "@/components/global/post/comment-dialog/CommentCard";
import {CommentForm} from "@/components/global/post/comment-dialog/CommentForm";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useToast} from "@/components/ui/use-toast";
import {useCreateComment} from "@/hooks/mutations/comments/useCreateComment";
import {usePostComments} from "@/hooks/queries/usePostComments";

type Props = {
    postId: string;
    children: ReactNode;
}

export const CommentDialog = async ({ postId, children }: Props) => {
    const { mutateAsync: createComment, isPending } = useCreateComment();

    const { toast } = useToast();

    const commentFormAction = async (content: string) => {
        const data = await createComment({
            postId,
            content,
        });

        if (!!data) return;

        toast({
            title: "Erro",
            description: 'Ocorreu um erro ao criar seu comentário',
            variant: 'destructive',
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className='flex h-[90vh] w-full max-w-[70vw] flex-col justify-between'>
                <DialogHeader>
                    <DialogTitle>Comentários</DialogTitle>
                </DialogHeader>

                <CommentList postId={postId} />

                <DialogFooter>
                    { !!postId && <CommentForm action={commentFormAction} isLoading={isPending} /> }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const CommentList = ({ postId }: { postId: string }) => {
    const { data: comments, isLoading } = usePostComments({
        postId,
        page: 1,
        pageSize: 100,
    })

    if (isLoading) return <LoaderWithText />

    if (!comments?.length)
        return <div className='text-center text-xl'>Ainda não há nenhum comentário nessa publicação.</div>;

    return (
        <ScrollArea className='mb-auto'>
            <div className='flex h-full flex-col gap-3 p-3'>
                {
                    comments.map((comment) =>
                        <CommentCard key={comment.Id} comment={comment} />)
                }
            </div>
        </ScrollArea>
    )
}