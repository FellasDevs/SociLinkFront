import {revalidateTag} from "next/cache";

import {User} from "@/types/models/User";

import {Button} from "@/components/ui/button";
import {
    DeleteFriendshipRequest,
    GetFriendshipByNicknameRequest,
    RequestFriendshipRequest
} from "@/http/requests/server-side/friendships";
import {GetSelfRequest} from "@/http/requests/server-side/users";

type Props = {
    friend: User;
}

export const FriendshipButton = async ({ friend }: Props) => {
    'use server'

    const loggedUser = await GetSelfRequest();

    if (!loggedUser || loggedUser.Id === friend.Id) return null;

    const friendship = await GetFriendshipByNicknameRequest(friend.Nickname);

    const deleteFriendship = async () => {
        'use server'

        const confirmed = confirm(`Tem certeza que deseja desfazer a sua amizade com ${friend.Name.split(' ')[0]}?`);

        if (!confirmed) return;

        return DeleteFriendshipRequest(friend.Id);
    }

    const friendshipAction = async () => {
        'use server'

        !!friendship ? await deleteFriendship() : await RequestFriendshipRequest(friend.Id);
        revalidateTag(`friendship-${friend.Nickname}`);
    }

    return (
        <form action={friendshipAction}>
            <Button>{!!friendship ? 'Desfazer' : 'Solicitar'} amizade</Button>
        </form>
    )
}