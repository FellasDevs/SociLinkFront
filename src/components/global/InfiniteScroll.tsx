import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

import { LoaderWithText } from '@/components/global/Loader';

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
        { isFetchingPreviousPage && <LoadingComponent /> }
      </div>

      <div className='flex flex-col gap-2'>
        {children}
      </div>

      <div ref={nextRef}>
        { isFetchingNextPage && <LoadingComponent /> }
      </div>
    </div>
  )
}

const LoadingComponent = () => {
  return (
    <div className='m-3 flex items-center justify-center text-2xl'>
      <LoaderWithText />
    </div>
  )
}