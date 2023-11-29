import { Friendship } from '@/types/models/Friendship';

import { ClientSideFriendsRoutes } from '@/http/requests/client-side/friends';
import { GetFriendsParams } from '@/http/requests/server-side/friends';
import { useInfiniteQuery } from '@tanstack/react-query';

export type UseFriendshipRequestsProps = {
  initialData: Friendship[];
  params: GetFriendsParams;
}

export const useFriendshipRequests = ({ initialData, params: { page, pageSize } }: UseFriendshipRequestsProps) => {
  return useInfiniteQuery({
    queryKey: ['friendship-requests'],
    queryFn: async ({ pageParam }): Promise<Friendship[]> => {
      const friends = await ClientSideFriendsRoutes.getFriendshipRequests({
        page: pageParam,
        pageSize,
      });

      return friends ?? [];
    },
    initialPageParam: page,
    initialData: {
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