import { Friendship } from '@/types/models/Friendship';

import { ClientSideFriendsRoutes } from '@/http/requests/client-side/friends';
import { GetFriendsParams } from '@/http/requests/server-side/friends';
import { useInfiniteQuery } from '@tanstack/react-query';

export type UseFriendsProps = GetFriendsParams;

export const useFriends = ({ page, pageSize }: UseFriendsProps) => {
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
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < pageSize) return null;
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= 1) return undefined;
      return firstPageParam - 1;
    },
    maxPages: 3,
  });
}