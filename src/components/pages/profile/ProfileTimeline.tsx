'use client';

import {InfiniteScroll} from '@/components/global/InfiniteScroll';
import {PostCard} from "@/components/global/timeline/postCard";
import {useProfileTimeline, UseProfileTimelineProps} from '@/hooks/queries/useProfileTimeline';

export const ProfileTimeline = ({initialData, params}: UseProfileTimelineProps) => {
    const {data: posts, ...queryParams} = useProfileTimeline({
        initialData,
        params,
    })

    return (
        <div className='mx-auto w-full max-w-[50em]'>
          <InfiniteScroll {...queryParams}>
            <div className='flex flex-col gap-5'>
              {
                posts?.pages.flat().map((post, i) => (
                  <PostCard post={post} key={i}/>
                ))
              }
            </div>
          </InfiniteScroll>
        </div>
    )
}