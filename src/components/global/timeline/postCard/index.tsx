import { Post } from '@/types/models/Post';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { timeSince } from '@/utils/dateToTime';
import { MessageCircle, Send, ThumbsUp } from 'lucide-react';

type PostCardProps = { post: Post }
export const PostCard = ({post}: PostCardProps) => {
    const buttonClasses = "flex w-1/3 gap-1"

    return (
        <Card className="flex w-full max-w-[40em] flex-col gap-4 p-6">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={post.User.Picture}/>
                        <AvatarFallback>
                            {post.User.Name.split(' ')[0]}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <div>{post.User.Name}</div>
                        <div>{timeSince(new Date(post.CreatedAt))}</div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="rounded-xl border-2 border-input p-2">
                <p className="text-xl">{post.Content}</p>
            </CardContent>

            <CardFooter>
                <div className="flex w-full gap-4">
                    <Button className={buttonClasses}>
                        <ThumbsUp/>
                        Curtir
                    </Button>

                    <Button className={buttonClasses}>
                        <MessageCircle/>
                        Comentar
                    </Button>

                    <Button className={buttonClasses}>
                        <Send/>
                        Compartilhar
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}