import {UserCircle} from "lucide-react";
import {User as user} from "@/types/models/User";
import {Avatar, AvatarImage} from "@/components/ui/avatar";


type Props = {
    user: user;
}

export const UserAvatar = ({user}: Props) => {
    return (
        <Avatar>
            {user.Picture ? <AvatarImage src={user.Picture}/> : <UserCircle size='md'/>}
        </Avatar>
    )
}