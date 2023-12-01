'use client'

import {ReactNode} from "react";

import {CommentCard} from "@/components/global/comment-dialog/CommentCard";
import {CommentForm} from "@/components/global/comment-dialog/CommentForm";
import {LoaderWithText} from "@/components/global/Loader";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {usePostComments} from "@/hooks/queries/usePostComments";

type Props = {
    postId: string;
    children: ReactNode;
}

export const CommentDialog = async ({ postId, children }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className='flex h-[80vh] w-full max-w-[80vw] flex-col justify-between'>
                <DialogHeader>
                    <DialogTitle>Comentários</DialogTitle>
                </DialogHeader>

                <CommentList postId={postId} />

                <DialogFooter>
                    { !!postId && <CommentForm postId={postId} /> }
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
        <div className='flex h-full w-full flex-col gap-3'>
            {
                comments.map((comment) =>
                    <CommentCard key={comment.Id} comment={comment} />)
            }
        </div>
    )
}