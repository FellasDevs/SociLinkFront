'use client';

import { InfiniteScroll } from '@/components/global/InfiniteScroll';
import { useProfileTimeline, UseProfileTimelineProps } from '@/hooks/queries/useProfileTimeline';

export const ProfileTimeline = ({ initialData, params }: UseProfileTimelineProps) => {
  const { data: posts, ...queryParams } = useProfileTimeline({
    initialData,
    params,
  })

  return (
    <InfiniteScroll {...queryParams}>
      <div className='m-3 flex flex-col items-center gap-5'>
        {
          posts.pages.flat().map(post => (
            <div key={post.Id} className='min-w-[20em] rounded border-2 p-5'>
              <div className='flex items-center'>
                <div>{post.User.Name}</div>
              </div>
              <div>{post.Content}</div>
            </div>
          ))
        }
      </div>
    </InfiniteScroll>
  )
}