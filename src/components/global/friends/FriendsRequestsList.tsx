import {GetFriendshipRequestsParams, ServerSideFriendsRoutes} from "@/http/requests/server-side/friends";
import {FriendshipRequestsList} from "@/components/layout/friendships-bar/FriendshipRequestsList";

export const FriendsRequestsList = async () => {
    const params: GetFriendshipRequestsParams = {
        page: 1,
        pageSize: 10,
    };

    const requests = await ServerSideFriendsRoutes.getFriendshipRequests(params);

    if (!requests?.length)
        return <div className='m-5 text-lg'>Não há nenhuma solicitação de amizade no momento.</div>

    return <FriendshipRequestsList initialData={requests} params={params}/>
}