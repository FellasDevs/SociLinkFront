import {Post} from '@/types/models/Post';

import {dislikePostAction, likePostAction} from "@/actions/posts";
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {timeSince} from '@/utils/dateToTime';
import {MessageCircle, Send, ThumbsUp} from 'lucide-react';
import {Carousel} from "@/components/global/Carousel";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Preview} from "@/components/global/Preview";

type Props = { post: Post }

export const PostCard = ({post}: Props) => {
    console.log('post', post)

    return (
        <Card className="flex w-full flex-col gap-4 p-6">
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

                <Dialog>
                    <DialogTrigger>
                        <div className="flex justify-center">
                            <Preview className='w-full h-full mx-auto' images={post.Images}/>
                        </div>
                    </DialogTrigger>

                    <DialogContent className="h-[80vh] max-w-[80vw] w-full p-8">
                        <Carousel images={post.Images}/>
                    </DialogContent>
                </Dialog>
            </CardContent>

            <CardFooter>
                <div className="flex w-full gap-4 [&>*]:w-1/3 [&_button]:flex [&_button]:gap-1 [&_button]:text-lg">
                    <form
                        action={(post.Liked ? dislikePostAction : likePostAction).bind(null, post.Id)}
                        className='hidden md:flex'
                    >
                        <Button type='submit' className={`w-full ${post.Liked ? 'opacity-80' : ''}`}>
                            <ThumbsUp/>
                            {post.Liked ? 'Descurtir' : 'Curtir'}
                            {!!post.Likes ? <div>({post.Likes})</div> : null}
                        </Button>
                    </form>

                    <Button>
                        <MessageCircle/>
                        <div className='hidden md:flex'>Comentar</div>
                    </Button>

                    <Button>
                        <Send/>
                        <div className='hidden md:flex'>Compartilhar</div>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}