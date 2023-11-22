'use server';

import { revalidateTag } from 'next/cache';

import {Friendship} from "@/types/models/Friendship";
import { User } from '@/types/models/User';

import {
  AnswerFriendshipRequestRequest,
  DeleteFriendshipRequest,
  RequestFriendshipRequest,
} from '@/http/requests/server-side/friendships';

export const requestFriendshipAction = async (friend: User) => {
  await RequestFriendshipRequest(friend.Id);
  revalidateTag(`friendship-${friend.Nickname}`);
}

export const deleteFriendshipAction = async (friendship: Friendship) => {
  await DeleteFriendshipRequest(friendship.Id);
  revalidateTag(`friendship-${friendship.Friend.Nickname}`);
}

export const answerFriendshipAction = async (friendship: Friendship, accepted: boolean) => {
  await AnswerFriendshipRequestRequest({requestId: friendship.Id, answer: accepted});
  revalidateTag(`friendship-${friendship.Friend.Nickname}`);
}