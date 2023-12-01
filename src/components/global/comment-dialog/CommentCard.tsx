import {Comment} from '@/types/models/Comment'

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {timeSince} from "@/utils/dateToTime";

type Props = {
    comment: Comment;
}

export const CommentCard = ({ comment }: Props) => {
    return (
        <Card className="flex w-full flex-col gap-4 p-6">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={comment.User.Picture}/>
                        <AvatarFallback>
                            {comment.User.Name.split(' ')[0]}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <div>{comment.User.Name}</div>
                        <div>{timeSince(new Date(comment.CreatedAt))}</div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="rounded-xl border-2 border-input p-2">
                <p className="text-xl">{comment.Content}</p>
            </CardContent>
        </Card>
    )
}