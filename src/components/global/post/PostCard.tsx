'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useFormStatus } from 'react-dom';

import { Post } from '@/types/models/Post';

import { CommentDialog } from './comment-dialog';

import {
  deletePostAction,
  dislikePostAction,
  likePostAction,
} from '@/actions/posts';
import { CreatePostForm } from '@/components/global/post/create-post-form';
import { UserAvatar } from '@/components/global/UserAvatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { timeSince } from '@/utils/dateToTime';
import { Edit, MessageCircle, Send, ThumbsUp, Trash } from 'lucide-react';

type Props = {
  post: Post;
  isRepost?: boolean;
};

export const PostCard = ({ post, isRepost }: Props) => {
  return (
    <Card
      key={'post-card-' + post.Id}
      className="flex w-full flex-col gap-4 p-6 shadow-lg"
    >
      <CardHeader>
        <GetCardHeader post={post} />
      </CardHeader>

      <CardContent className="rounded-xl border-2 border-input p-5">
        <GetCardContent post={post} />
      </CardContent>

      <CardFooter>
        <GetCardFooter post={post} isRepost={isRepost} />
      </CardFooter>
    </Card>
  );
};

const GetCardContent = ({ post }: { post: Post }) => {
  return (
    <>
      <p className="text-xl">{post.Content}</p>

      {!!post.OriginalPost && (
        <div className="p-5">
          <PostCard post={post.OriginalPost} isRepost={true} />
        </div>
      )}
    </>
  );
};

const GetCardHeader = ({ post }: { post: Post }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const deletePost = useCallback(async () => {
    const confirmed = confirm('Tem certeza que deseja excluir esta postagem?');
    if (!confirmed) return;

    await deletePostAction.bind(null, post.Id)();
  }, [post]);

  return (
    <div className="flex justify-between">
      <Link
        href={'/profile/' + post.User.Nickname}
        className="flex w-fit items-center gap-3"
      >
        <UserAvatar user={post.User} className="h-12 w-12" />

        <div>
          <div className="text-lg">{post.User.Name}</div>
          <div>{timeSince(new Date(post.CreatedAt))}</div>
        </div>
      </Link>

      <div className="flex">
        <Dialog
          key={post.Id + '-' + modalOpen}
          open={modalOpen}
          onOpenChange={setModalOpen}
        >
          <DialogTrigger asChild>
            <Button variant="ghost" className="text-primary">
              <Edit />
            </Button>
          </DialogTrigger>

          <DialogContent className="min-w-[50em] p-3 pt-10">
            <CreatePostForm
              post={post}
              isEdit={true}
              onCreate={() => setModalOpen(false)}
            />
          </DialogContent>
        </Dialog>

        <form action={deletePost}>
          <GetDeleteButton />
        </form>
      </div>
    </div>
  );
};

const GetDeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="ghost"
      className="text-destructive"
      isLoading={pending}
    >
      <Trash />
    </Button>
  );
};

const GetCardFooter = ({
  post,
  isRepost,
}: {
  post: Post;
  isRepost?: boolean;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex w-full gap-4 [&>*]:w-1/3 [&_.action]:flex [&_.action]:gap-1 [&_.action]:text-lg">
      <form
        action={(post.Liked ? dislikePostAction : likePostAction).bind(
          null,
          post.Id
        )}
      >
        <GetLikeButton post={post} isRepost={isRepost} />
      </form>

      <CommentDialog postId={post.Id}>
        <Button
          type="button"
          className="action"
          variant={isRepost ? 'secondary' : 'default'}
        >
          <MessageCircle />
          <div className="hidden md:flex">Comentar</div>
        </Button>
      </CommentDialog>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="action"
            variant={isRepost ? 'secondary' : 'default'}
          >
            <Send />
            <div className="hidden md:flex">Compartilhar</div>
          </Button>
        </DialogTrigger>

        <DialogContent className="min-w-[50em] p-3 pt-10">
          <CreatePostForm
            originalPostId={post.Id}
            onCreate={() => setModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const GetLikeButton = ({
  post,
  isRepost,
}: {
  post: Post;
  isRepost?: boolean;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      isLoading={pending}
      variant={isRepost ? 'secondary' : 'default'}
      className={`action w-full ${post.Liked ? 'opacity-80' : ''}`}
    >
      <ThumbsUp />
      <div className="hidden md:flex">
        {post.Liked ? 'Descurtir' : 'Curtir'}
      </div>
      {!!post.Likes ? <div>({post.Likes})</div> : null}
    </Button>
  );
};
