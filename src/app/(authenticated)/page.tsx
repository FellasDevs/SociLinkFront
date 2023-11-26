import { Metadata } from 'next';
import { Suspense } from 'react';

import { PaginationRequestParams } from '@/types/http/Pagination';

import { CreatePostForm } from '@/components/pages/home/CreatePostForm';
import { OwnTimelineComponent } from '@/components/pages/home/OwnTimelineComponent';
import { ServerSidePostRoutes } from '@/http/requests/server-side/posts';

export const metadata: Metadata = {
  title: 'Início',
  description: 'Página inicial',
}

export default function Home() {
  return (
      <div className='flex flex-col items-center gap-10 p-5'>
        <CreatePostForm />
        
        <Suspense fallback={'loading'}>
          <Timeline />
        </Suspense>
      </div>
  )
}

const Timeline = async () => {
  const params: PaginationRequestParams = {
    page: 1,
    pageSize: 5,
  }

  const posts = await ServerSidePostRoutes.getOwnTimeline(params);

  return <OwnTimelineComponent initialData={posts} params={params} />
}