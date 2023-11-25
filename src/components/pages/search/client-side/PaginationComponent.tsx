'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ReactNode, useCallback, useMemo } from 'react';

import { PaginationResponse } from '@/types/http/Pagination';

import { Button } from '@/components/ui/button';

type Props = {
  paginationProps: PaginationResponse;
  // action: (page: number) => void;
  children?: ReactNode;
}

export const PaginationComponent = ({ paginationProps, children }: Props) => {
  return (
    <div className='flex flex-col gap-3'>
      <PaginationRow {...paginationProps} />
      {children}
      <PaginationRow {...paginationProps} />
    </div>
  )
}

const PaginationRow = ({ Page, PageSize, TotalCount  }: PaginationResponse) => {
  const pathName = usePathname();
  const initialParams = useSearchParams();

  const buttonAmount = Math.ceil(TotalCount / PageSize);

  const buttons = useMemo(() => {
    const btns = [1];

    if (Page > 2) btns.push(Page - 1);
    if (Page > 1) btns.push(Page);
    if (Page < (buttonAmount - 1)) btns.push(Page + 1);

    if (buttonAmount > 1) btns.push(buttonAmount);

    return btns;
  }, [Page, buttonAmount])

  const getNewUrl = useCallback((newPage: number) => {
      const params = new URLSearchParams(initialParams);
      params.set('page', String(newPage));

      return pathName + '?' + params.toString();
    },
    [initialParams, pathName]
  );

  return (
    <div className='flex justify-end gap-2'>
      {buttons.map((page) => (
        <Link key={page} href={getNewUrl(page)} passHref>
          <Button disabled={Page === page} variant='outline'>
            {page}
          </Button>
        </Link>
      ))}
    </div>
  )
}