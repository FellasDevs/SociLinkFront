'use client';

import { useMemo, useState } from 'react';

import { Comment } from '@/types/models/Comment';

import { CommentForm } from '@/components/global/post/comment-dialog/CommentForm';
import { UserAvatar } from '@/components/global/UserAvatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useDeleteComment } from '@/hooks/mutations/comments/useDeleteComment';
import { useEditComment } from '@/hooks/mutations/comments/useEditComment';
import { useUserStore } from '@/stores/userStore';
import { timeSince } from '@/utils/dateToTime';
import { Edit, Trash } from 'lucide-react';

type Props = {
  comment: Comment;
};

export const CommentCard = ({ comment }: Props) => {
  const { user } = useUserStore();

  return (
    <Card className="flex w-full flex-col gap-4 p-6">
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar user={comment.User} className="h-12 w-12" />

            <div>
              <div>{comment.User.Name}</div>
              <div>{timeSince(new Date(comment.CreatedAt))}</div>
            </div>
          </div>

          {user?.Id === comment.User.Id && <ActionArea comment={comment} />}
        </div>
      </CardHeader>

      <CardContent className="rounded-xl border-2 border-input p-2">
        <p className="text-xl">{comment.Content}</p>
      </CardContent>
    </Card>
  );
};

const ActionArea = ({ comment }: { comment: Comment }) => {
  const { mutateAsync: editComment, isPending: editLoading } = useEditComment();
  const { mutateAsync: deleteComment, isPending: deleteLoading } =
    useDeleteComment();

  const isLoading = useMemo(
    () => editLoading || deleteLoading,
    [deleteLoading, editLoading]
  );

  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const editAction = async (content: string) => {
    const data = await editComment({
      content,
      commentId: comment.Id,
    });

    if (!!data) {
      setOpen(false);
      return;
    }

    toast({
      title: 'Erro',
      description: 'Ocorreu um erro ao editar seu comentário',
      variant: 'destructive',
    });
  };

  const deleteAction = async () => {
    const didConfirm = confirm(
      'Tem certeza que deseja apagar esse comentário?'
    );

    if (!didConfirm) return;

    const data = await deleteComment(comment.Id);

    if (!!data) return;

    toast({
      title: 'Erro',
      description: 'Ocorreu um erro ao deletar seu comentário',
      variant: 'destructive',
    });
  };

  return (
    <div className="flex p-2">
      <Dialog key={comment.Id + '-' + open} open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-primary"
            isLoading={isLoading}
          >
            <Edit />
          </Button>
        </DialogTrigger>

        <DialogContent className="flex h-fit max-h-[30em] w-full max-w-[50em] flex-col justify-between">
          <DialogHeader>
            <DialogTitle>Editar comentário</DialogTitle>
          </DialogHeader>

          <CommentForm
            initialValue={comment.Content}
            action={editAction}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>

      <Button
        variant="ghost"
        className="text-destructive"
        onClick={deleteAction}
      >
        <Trash />
      </Button>
    </div>
  );
};
