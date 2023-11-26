'use client';

import { useEffect } from 'react';

import { PaginationRequestParams } from '@/types/http/Pagination';
import { Post } from '@/types/models/Post';

import { InfiniteScroll } from '@/components/global/InfiniteScroll';
import { useOwnTimeline } from '@/hooks/useOwnTimeline';

type Props = {
  initialData: Post[];
  params: PaginationRequestParams;
}

export const OwnTimelineComponent = ({ initialData, params }: Props) => {
  const { data: posts, ...queryParams } = useOwnTimeline({
    initialData,
    params,
  })

  useEffect(() => {
    console.log(posts?.pageParams);
  }, [posts?.pageParams]);

  return (
    <InfiniteScroll {...queryParams} rootMargin='1000px'>
      {posts.pages.flat().map((post, i) => (
        <div key={post.Id} className='h-[30em] w-[50em] rounded-lg border'>
          <div>{i}: {post.User.Name.split(' ')[0]} - {post.Content} - {post.Visibility}</div>
        </div>
      ))}
    </InfiniteScroll>
  )
}
