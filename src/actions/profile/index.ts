'use server';

import { revalidateTag } from 'next/cache';

import { Friendship } from '@/types/models/Friendship';
import { User } from '@/types/models/User';

import { FriendshipRoutes } from '@/http/requests/server-side/friendships';

export const requestFriendshipAction = async (friend: User) => {
  await FriendshipRoutes.requestFriendship(friend.Id);
  revalidateTag(`friendship-${friend.Nickname}`);
}

export const deleteFriendshipAction = async (friendship: Friendship) => {
  await FriendshipRoutes.deleteFriendship(friendship.Id);
  revalidateTag(`friendship-${friendship.Friend.Nickname}`);
}

export const answerFriendshipAction = async (friendship: Friendship, accepted: boolean) => {
  await FriendshipRoutes.answerFriendshipRequest({requestId: friendship.Id, answer: accepted});
  revalidateTag(`friendship-${friendship.Friend.Nickname}`);
}