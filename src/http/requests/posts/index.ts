import { User } from '@/types/User';

import { fetchClient } from '@/http/http-client/fetch';

type Post = {
  Id: string;
  Content: string;
  Images: string[];
  Visibility: string;
  User: User
}

export const GetOwnTimelineRequest = async () => {
  return fetchClient<Post[]>('/timeline', {next: {tags: ['timeline'], revalidate: 60 * 2}});
}

export const GetUserTimelineRequest = async (id: string) => {
  return fetchClient<Post[]>(`/timeline/${id}`, {next: {tags: [`timeline-${id}`], revalidate: 60 * 2}});
}