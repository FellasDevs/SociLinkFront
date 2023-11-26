import { Post } from '@/types/models/Post';

import { ClientSidePostRoutes } from '@/http/requests/client-side/posts';
import { GetHomeTimelineParams } from '@/http/requests/server-side/posts';
import { useInfiniteQuery } from '@tanstack/react-query';

type Props = {
  initialData: Post[];
  params: GetHomeTimelineParams;
}

export const useHomeTimeline = ({ initialData, params: { page, pageSize } }: Props) => {
  return useInfiniteQuery({
    queryKey: ['home-timeline'],
    queryFn: async ({ pageParam }): Promise<Post[]> => {
      const posts = await ClientSidePostRoutes.getHomeTimeline({
        page: pageParam,
        pageSize,
      });

      return posts ?? [];
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