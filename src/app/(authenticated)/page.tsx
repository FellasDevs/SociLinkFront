import { Metadata } from 'next';
import { Suspense } from 'react';

import { CreatePostComponent } from '@/components/pages/home/CreatePostComponent';
import { PostRoutes } from '@/http/requests/server-side/posts';

export const metadata: Metadata = {
  title: 'Início',
  description: 'Página inicial',
}

export default function Home() {
  return (
      <div className='flex flex-col items-center gap-10 p-5'>
        <CreatePostComponent />
        
        <Suspense fallback={'loading'}>
          <Timeline />
        </Suspense>
      </div>
  )
}

const Timeline = async () => {
  const posts = await PostRoutes.getOwnTimeline();

  return (
    <div className='flex flex-col gap-2'>
      {posts.map((post, i) => (
        <div key={post.Id} className='rounde-xl border'>
          {i}: {post.User.Name.split(' ')[0]} - {post.Content} - {post.Visibility}
        </div>
      ))}
    </div>
  )
}