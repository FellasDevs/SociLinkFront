'use client';

import {InfiniteScroll} from '@/components/global/InfiniteScroll';
import {PostCard} from "@/components/global/timeline/postCard"; 
import {useHomeTimeline, UseHomeTimelineProps} from '@/hooks/queries/useHomeTimeline';

export const HomeTimeline = ({initialData, params}: UseHomeTimelineProps) => {
    const {data: posts, ...queryParams} = useHomeTimeline({
        initialData,
        params,
    });

    return (
        <div className='w-full'>
          <InfiniteScroll {...queryParams} rootMargin='1000px'>
            <div className='m-3 flex flex-col items-center gap-5'>
              {
                posts.pages.flat().map((post, i) => (
                  <PostCard post={post} key={i}/>
                ))
              }
            </div>
          </InfiniteScroll>
        </div>
    )
}
