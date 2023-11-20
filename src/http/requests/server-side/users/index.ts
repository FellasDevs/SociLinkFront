import { User } from '@/types/models/User';

import { fetchClient } from '@/http/http-client/fetch';

type GetSelfResponse = {
  User: User;
}

export const GetSelfRequest = async () => {
  try {
    const { data } = await fetchClient<GetSelfResponse>('/users/self', { next: { tags: ['getSelf'], revalidate: 60 * 30 }});

    return data.User;
  } catch (e) {
    console.error(e);

    return null;
  }
}
