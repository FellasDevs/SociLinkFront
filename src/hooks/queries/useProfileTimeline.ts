'use client'

import { Post } from '@/types/models/Post';

import { ClientSidePostRoutes } from '@/http/requests/client-side/posts';
import { GetProfileTimelineParams } from '@/http/requests/server-side/posts';
import { useInfiniteQuery } from '@tanstack/react-query';

export type UseProfileTimelineProps = {
  initialData: Post[];
  params: GetProfileTimelineParams;
}

export const useProfileTimeline = ({ initialData, params: { nickname, page, pageSize } }: UseProfileTimelineProps) => {
  return useInfiniteQuery({
    queryKey: ['timeline', 'home'],
    queryFn: async ({ pageParam }): Promise<Post[]> => {
      const response = await ClientSidePostRoutes.getProfileTimeline({
        nickname,
        page: pageParam,
        pageSize,
      });

      return response?.Posts ?? [];
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