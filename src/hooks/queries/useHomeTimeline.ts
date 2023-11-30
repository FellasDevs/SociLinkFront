import { Post } from '@/types/models/Post';

import { ClientSidePostRoutes } from '@/http/requests/client-side/posts';
import { GetHomeTimelineParams } from '@/http/requests/server-side/posts';
import { useInfiniteQuery } from '@tanstack/react-query';

export type UseHomeTimelineProps = {
  initialData: Post[];
  params: GetHomeTimelineParams;
}

export const useHomeTimeline = ({ initialData, params: { page, pageSize } }: UseHomeTimelineProps) => {
  return useInfiniteQuery({
    queryKey: ['timeline', 'profile'],
    queryFn: async ({ pageParam }): Promise<Post[]> => {
      const posts = await ClientSidePostRoutes.getHomeTimeline({
        page: pageParam,
        pageSize,
      });

      return posts ?? [];
    },
    initialPageParam: page,
    placeholderData: {
      pages: [initialData],
      pageParams: [page],
    },
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < pageSize) return undefined;
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