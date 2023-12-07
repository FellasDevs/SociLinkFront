'use server';

import {revalidateTag} from 'next/cache';

import {Friendship} from '@/types/models/Friendship';
import {User} from '@/types/models/User';

import {ServerSideFriendsRoutes} from '@/http/requests/server-side/friends';
import {EditUserParams, UserRoutes} from "@/http/requests/server-side/users";

export const requestFriendshipAction = async (friend: User) => {
    await ServerSideFriendsRoutes.requestFriendship(friend.Id);
    revalidateTag(`friendship-${friend.Nickname}`);
}

export const deleteFriendshipAction = async (friendship: Friendship) => {
    await ServerSideFriendsRoutes.deleteFriendship(friendship.Id);
    revalidateTag(`friendship-${friendship.Friend.Nickname}`);
    revalidateTag('friendships');
}

export const answerFriendshipAction = async (friendship: Friendship, accepted: boolean) => {
    await ServerSideFriendsRoutes.answerFriendshipRequest({requestId: friendship.Id, answer: accepted});
    revalidateTag(`friendship-${friendship.Friend.Nickname}`);
    revalidateTag('friendships');
    revalidateTag('friendship-requests');
}

export const editUserAction = async (params: EditUserParams) => {
    await UserRoutes.editUser(params)
    revalidateTag('get-self');
    revalidateTag('timeline')
}