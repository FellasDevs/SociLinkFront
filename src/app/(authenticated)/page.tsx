import { revalidateTag } from 'next/cache';
import { Suspense } from 'react';

import { GetOwnTimelineRequest } from '@/http/requests/posts';

export default function Home() {
  return (
      <div className=''>
        <Suspense fallback={'loading'}>
          <Timeline />
        </Suspense>
      </div>
  )
}

const Timeline = async () => {
  const { data } = await GetOwnTimelineRequest();

  const a = async () => {
    'use server'
    revalidateTag('timeline')
  }

  return (
    <div className='flex flex-col space-x-1'>
      <form action={a}>
        <button type='submit'>atualizar juca</button>
      </form>

      {data.map((post) => (
        <div key={post.Id}>
          {post.Content}
        </div>
      ))}
    </div>
  )
}