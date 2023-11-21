import {Friendship} from "@/types/models/Friendship";

import {fetchClient} from "@/http/http-client/fetch";

type AnswerFriendshipRequestProps = {
    requestId: string;
    answer: boolean;
}

type GetFriendsResponse = {
    Friends: Friendship[];
}

type GetFriendshipRequestsResponse = {
    Requests: Friendship[];
}

type GetFriendshipByNicknameResponse = {
    Friendship: Friendship;
}

export const GetFriendsRequest = async () => {
    try {
        const { data } = await fetchClient<GetFriendsResponse>('/friendships');

        return data.Friends;
    } catch (e) {
        console.error(e);

        return null;
    }
}

export const GetFriendshipRequestsRequest = async (nickname: string) => {
    try {
        const { data } = await fetchClient<GetFriendshipRequestsResponse>(`/friendships/${nickname}`);

        return data;
    } catch (e) {
        console.error(e);

        return null;
    }
}

export const GetFriendshipByNicknameRequest = async (nickname: string) => {
    try {
        const { data } = await fetchClient<GetFriendshipByNicknameResponse>(`/friendships/${nickname}`);

        return data.Friendship;
    } catch (e) {
        console.error(e);

        return null;
    }
}

export const RequestFriendshipRequest = async (id: string) => {
    try {
        await fetchClient(`/friendships/${id}`, { method: 'POST' });
    } catch (e) {
        console.error(e);

        alert('Ocorreu um erro ao tentar realizar a solicitação de amizade')
    }
}

export const AnswerFriendshipRequestRequest = async (props: AnswerFriendshipRequestProps) => {
    try {
        await fetchClient('/friendships/answer', {
            method: 'POST',
            body: JSON.stringify(props),
        });
    } catch (e) {
        console.error(e);

        throw new Error('Ocorreu um erro ao tentar realizar a solicitação de amizade')
        // alert('Ocorreu um erro ao tentar realizar a solicitação de amizade')
    }
}

export const DeleteFriendshipRequest = async (friendshipId: string) => {
    try {
        await fetchClient(`/friendships/${friendshipId}`, { method: 'DELETE' });
    } catch (e) {
        console.error(e);

        alert('Ocorreu um erro ao tentar remover a amizade')
    }
}

