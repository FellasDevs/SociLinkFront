import { User } from '@/types/User';

import { fetchClient } from '@/http/http-client/fetch';

type Post = {
  Id: string;
  Content: string;
  Images: string[];
  Visibility: string;
  User: User
}

type TimelineResponse = {
  Posts: Post[];
}

export const GetOwnTimelineRequest = async () => {
  try {
    const { data } = await fetchClient<TimelineResponse>('/timeline', {next: {tags: ['timeline'], revalidate: 60 * 2}});

    return data.Posts;
  } catch (e) {
    console.error(e);

    return [];
  }
}

export const GetUserTimelineRequest = async (nickname: string) => {
  try {
    const { data } = await fetchClient<TimelineResponse>(`/timeline/${nickname}`, {next: {tags: [`timeline-${nickname}`], revalidate: 60 * 2}});

    return data.Posts;
  } catch (e) {
    console.error(e);

    return [];
  }
}