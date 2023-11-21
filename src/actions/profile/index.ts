'use server';

import { revalidateTag } from 'next/cache';

import { User } from '@/types/models/User';

import {
  AnswerFriendshipRequestRequest,
  DeleteFriendshipRequest,
  RequestFriendshipRequest,
} from '@/http/requests/server-side/friendships';

export const requestFriendship = async (friend: User) => {
  await RequestFriendshipRequest(friend.Id);
  revalidateTag(`friendship-${friend.Nickname}`);
}

export const deleteFriendship = async (friend: User) => {
  const confirmed = confirm(`Tem certeza que deseja desfazer a sua amizade com ${friend.Name.split(' ')[0]}?`);

  if (!confirmed) return;

  await DeleteFriendshipRequest(friend.Id);
  revalidateTag(`friendship-${friend.Nickname}`);
}

export const answerFriendship = async (friend: User, accepted: boolean) => {
  await AnswerFriendshipRequestRequest({requestId: friend.Id, answer: accepted});
  revalidateTag(`friendship-${friend.Nickname}`);
}