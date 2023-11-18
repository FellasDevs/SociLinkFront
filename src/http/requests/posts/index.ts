import { User } from '@/types/models/User';

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