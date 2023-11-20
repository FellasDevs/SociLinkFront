import { Post } from '@/types/models/Post';
import { User } from '@/types/models/User';

import { fetchClient } from '@/http/http-client/fetch';

type GetOwnTimelineResponse = {
  Posts: Post[];
}

type GetUserTimelineResponse = {
  Posts: Post[];
  User: User;
}

export const GetOwnTimelineRequest = async (): Promise<Post[]> => {
  try {
    const { data } = await fetchClient<GetOwnTimelineResponse>('/timeline', {next: {tags: ['timeline'], revalidate: 60 * 2}});

    return data.Posts;
  } catch (e) {
    console.error(e);

    return [];
  }
}

export const GetUserTimelineRequest = async (nickname: string): Promise<GetUserTimelineResponse | null> => {
  try {
    const { data } = await  fetchClient<GetUserTimelineResponse>(`/timeline/${nickname}`, {next: {tags: [`timeline-${nickname}`], revalidate: 60 * 2}});

    return data;
  } catch (e) {
    console.error(e);

    return null;
  }
}