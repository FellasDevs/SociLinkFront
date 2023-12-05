'use client'

import Link from 'next/link';
import {useFormStatus} from 'react-dom';

import {Post} from '@/types/models/Post';

import {CommentDialog} from "./comment-dialog";

import {dislikePostAction, likePostAction} from "@/actions/posts";
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {timeSince} from '@/utils/dateToTime';
import {MessageCircle, Send, ThumbsUp} from 'lucide-react';
import {UserAvatar} from "@/components/global/UserAvatar";

type Props = { post: Post }

export const PostCard = ({post}: Props) => {
    return (
        <Card className="flex w-full flex-col gap-4 p-6 shadow-lg">
            <CardHeader>
                <GetCardHeader post={post}/>
            </CardHeader>

            <CardContent className="rounded-xl border-2 border-input p-2">
                <p className="text-xl">
                    {post.Content}
                </p>
            </CardContent>

            <CardFooter>
                <GetCardFooter post={post}/>
            </CardFooter>
        </Card>
    )
}

const GetCardHeader = ({post}: { post: Post }) => {
    return (
        <Link href={'/profile/' + post.User.Nickname} className="flex w-fit items-center gap-3">
            <UserAvatar user={post.User}/>

            <div>
                <div>{post.User.Name}</div>
                <div>{timeSince(new Date(post.CreatedAt))}</div>
            </div>
        </Link>
    )
}

const GetCardFooter = ({post}: { post: Post }) => {
    return (
        <div className="flex w-full gap-4 [&>*]:w-1/3 [&_.action]:flex [&_.action]:gap-1 [&_.action]:text-lg">
            <form
                action={(post.Liked ? dislikePostAction : likePostAction).bind(null, post.Id)}
                className='flex'
            >
                <GetLikeButton post={post}/>
            </form>

            <CommentDialog postId={post.Id}>
                <Button type='button' className='action'>
                    <MessageCircle/>
                    <div className='hidden md:flex'>Comentar</div>
                </Button>
            </CommentDialog>

            <Button type='button' className='action'>
                <Send/>
                <div className='hidden md:flex'>Compartilhar</div>
            </Button>
        </div>
    )
}

const GetLikeButton = ({post}: { post: Post }) => {
    const {pending} = useFormStatus();

    return (
        <Button type='submit' isLoading={pending} className={`action w-full ${post.Liked ? 'opacity-80' : ''}`}>
            <ThumbsUp/>
            <div className='hidden md:flex'>{post.Liked ? 'Descurtir' : 'Curtir'}</div>
            {!!post.Likes ? <div>({post.Likes})</div> : null}
        </Button>
    )
}