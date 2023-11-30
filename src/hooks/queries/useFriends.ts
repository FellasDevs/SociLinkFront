import { Friendship } from '@/types/models/Friendship';

import { ClientSideFriendsRoutes } from '@/http/requests/client-side/friends';
import { GetFriendsParams } from '@/http/requests/server-side/friends';
import { useInfiniteQuery } from '@tanstack/react-query';

export type UseFriendsProps = {
  initialData: Friendship[];
  params: GetFriendsParams;
}

export const useFriends = ({ initialData, params: { page, pageSize } }: UseFriendsProps) => {
  return useInfiniteQuery({
    queryKey: ['friends'],
    queryFn: async ({ pageParam }): Promise<Friendship[]> => {
      const friends = await ClientSideFriendsRoutes.getFriends({
        page: pageParam,
        pageSize,
      });

      return friends ?? [];
    },
    initialPageParam: page,
    placeholderData: {
      pages: [initialData],
      pageParams: [page],
    },
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < pageSize) return null;
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= 1) return undefined;
      return firstPageParam - 1;
    },
    enabled: !initialData.length,
    maxPages: 3,
  });
}