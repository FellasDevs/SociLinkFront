'use client';

import { InfiniteScroll } from '@/components/global/InfiniteScroll';
import { useProfileTimeline, UseProfileTimelineProps } from '@/hooks/queries/useProfileTimeline';
import {PostCard} from "@/components/global/timeline/postCard";

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
            <PostCard post={post}/>
          ))
        }
      </div>
    </InfiniteScroll>
  )
}