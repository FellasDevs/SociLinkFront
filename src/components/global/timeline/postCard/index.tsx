import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {MessageCircle, Send, ThumbsUp} from "lucide-react";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Post} from "@/types/models/Post";
import {timeSince} from "@/utils/dateToTime";

type PostCardProps = { post: Post }
export const PostCard = ({post}: PostCardProps) => {

    const buttonClasses = "flex w-full gap-1"
    return (
        <Card className={"flex flex-col p-6 gap-4 max-w-[40em] w-full"}>
            <CardHeader>
                <div className={"flex gap-1"}>
                    <Avatar>
                        <AvatarImage src={post.User.Picture}/>
                        <AvatarFallback>{post.User.Name.split(' ')[0]}</AvatarFallback>
                    </Avatar>
                    <div className={"flex-wrap"}>
                        <div>
                            {post.User.Name}
                        </div>
                        <div>
                            {timeSince(new Date(post.CreatedAt))}
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className={"space-y-2 border-2 border-input rounded-xl p-2"}>
                <p className={"text-xl"}>{post.Content}</p>
                {
                    post.Images?.map((image, index) => (
                        <Image key={index} src={image} alt={"indisponível"} width={500} height={500}/>
                    ))
                }
            </CardContent>

            <CardFooter>
                <div className={"flex gap-4 w-full"}>
                    <Button className={buttonClasses}>
                        <ThumbsUp/>
                        {"Curtir"}
                    </Button>

                    <Button className={buttonClasses}>
                        <MessageCircle/>
                        {"Comentar"}
                    </Button>

                    <Button className={buttonClasses}>
                        <Send/>
                        {"Compartilhar"}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}