'use client';

import { InfiniteScroll } from '@/components/global/InfiniteScroll';
import { useHomeTimeline, UseHomeTimelineProps } from '@/hooks/queries/useHomeTimeline';

export const HomeTimeline = ({ initialData, params }: UseHomeTimelineProps) => {
  const { data: posts, ...queryParams } = useHomeTimeline({
    initialData,
    params,
  });

  return (
    <InfiniteScroll {...queryParams} rootMargin='1000px'>
      {
        posts.pages.flat().map((post, i) => (
          <div key={post.Id} className='h-[30em] w-[50em] rounded-lg border'>
            <div>{i}: {post.User.Name.split(' ')[0]} - {post.Content} - {post.Visibility}</div>
          </div>
        ))
      }
    </InfiniteScroll>
  )
}
