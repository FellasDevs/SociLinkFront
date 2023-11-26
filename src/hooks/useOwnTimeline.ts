import { PaginationRequestParams } from '@/types/http/Pagination';
import { Post } from '@/types/models/Post';

import { ClientSidePostRoutes } from '@/http/requests/server-side/client-side/posts';
import { useInfiniteQuery } from '@tanstack/react-query';

type Props = {
  initialData: Post[];
  params: PaginationRequestParams;
}

export const useOwnTimeline = ({ initialData, params: { page, pageSize } }: Props) => {
  return useInfiniteQuery({
    queryKey: ['own-timeline'],
    queryFn: async ({ pageParam }): Promise<Post[]> => {
      return await ClientSidePostRoutes.getOwnTimeline({
        page: pageParam,
        pageSize,
      });
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