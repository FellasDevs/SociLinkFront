import { Metadata } from 'next';
import { Suspense } from 'react';

import { LoaderWithText } from '@/components/global/Loader';
import { CreatePostForm } from '@/components/global/post/CreatePostForm';
import { HomeTimeline } from '@/components/pages/home/HomeTimeline';
import { GetHomeTimelineParams, ServerSidePostRoutes } from '@/http/requests/server-side/posts';

export const metadata: Metadata = {
  title: 'Início',
  description: 'Página inicial',
}

export default function Home() {

  return (
      <div className='flex flex-col items-center gap-2 p-5'>
        <CreatePostForm />
        
        <Suspense fallback={<LoaderWithText />}>
          <Timeline />
        </Suspense>
      </div>
  )
}

const Timeline = async () => {
  const params: GetHomeTimelineParams = {
    page: 1,
    pageSize: 10,
  }

  const posts = await ServerSidePostRoutes.getOwnTimeline(params);

  if (!posts) return <div className='text-xl'>Erro ao carregar timeline. Tente novamente mais tarde.</div>;

  if (!posts.length) return <div className='text-xl'>Nenhum post encontrado.</div>;

  return <HomeTimeline initialData={posts} params={params} />
}