'use client';

import { InfiniteScroll } from '@/components/global/InfiniteScroll';
import { useHomeTimeline, UseHomeTimelineProps } from '@/hooks/queries/useHomeTimeline';
import {PostCard} from "@/components/global/timeline/postCard";

export const HomeTimeline = ({ initialData, params }: UseHomeTimelineProps) => {
  const { data: posts, ...queryParams } = useHomeTimeline({
    initialData,
    params,
  });

  return (
    <InfiniteScroll {...queryParams} rootMargin='1000px'>
      <div className='m-3 flex flex-col items-center gap-5'>
        {
          posts.pages.flat().map(post => (
              <PostCard post={post}/>
          ))
        }
      </div>
    </InfiniteScroll>
  )
}
