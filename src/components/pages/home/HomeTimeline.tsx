'use client';

import { Post } from '@/types/models/Post';

import { InfiniteScroll } from '@/components/global/InfiniteScroll';
import { useHomeTimeline } from '@/hooks/queries/useHomeTimeline';
import { GetHomeTimelineParams } from '@/http/requests/server-side/posts';

type Props = {
  initialData: Post[];
  params: GetHomeTimelineParams;
}

export const HomeTimeline = ({ initialData, params }: Props) => {
  const { data: posts, ...queryParams } = useHomeTimeline({
    initialData,
    params,
  });

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
