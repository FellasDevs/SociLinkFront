import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

import { Loader } from '@/components/global/Loader';

type Props = {
    children: ReactNode;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
    isFetchingNextPage: boolean;
    isFetchingPreviousPage: boolean;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    rootMargin?: string;
}

export const InfiniteScroll = (
  {
    children,
    isFetchingNextPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
    hasPreviousPage,
    hasNextPage,
    rootMargin,
  }: Props) => {
  const { ref: previousRef } = useInView({
    rootMargin,
    onChange: (inView) => {
      console.log(inView);
      if (inView && hasPreviousPage && !isFetchingPreviousPage) fetchPreviousPage();
    }
  })

  const { ref: nextRef } = useInView({
    rootMargin,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    }
  })

  return (
    <div className='flex flex-col gap-3'>
      <div ref={previousRef}>
        { isFetchingPreviousPage && <div className='flex'><Loader /> Carregando...</div> }
      </div>

      <div className='flex flex-col gap-2'>
        {children}
      </div>

      <div ref={nextRef}>
        {
          isFetchingNextPage
            ? <div className='flex'><Loader /> Carregando...</div>
            : !hasNextPage ? <div className='text-lg'>Não há mais posts</div> : null
        }
      </div>
    </div>
  )
}