import {GetFriendsParams, ServerSideFriendsRoutes} from "@/http/requests/server-side/friends";
import Link from "next/link";
import {FriendshipList} from "@/components/layout/friendships-bar/FriendshipList";

export const FriendsList = async () => {
    const params: GetFriendsParams = {
        page: 1,
        pageSize: 10,
    };

    const friends = await ServerSideFriendsRoutes.getFriends(params);

    if (!friends?.length) {
        return (
            <div className='m-5 text-lg'>
                <div>Parece que você ainda não tem nenhum amigo.</div>
                <Link href='/search'>
                    <div>Clique aqui para encontrar pessoas.</div>
                </Link>
            </div>
        );
    }

    return <FriendshipList initialData={friends} params={params}/>
}