import { Metadata } from 'next';
import { revalidateTag } from 'next/cache';
import { Suspense } from 'react';

import {PostRoutes} from "@/http/requests/server-side/posts";

export const metadata: Metadata = {
  title: 'Início',
  description: 'Página inicial',
}

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
  const posts = await PostRoutes.getOwnTimeline();

  const a = async () => {
    'use server'
    revalidateTag('timeline')
  }

  return (
    <div className='flex flex-col space-x-1'>
      <form action={a}>
        <button type='submit'>atualizar juca</button>
      </form>

      {posts.map((post) => (
        <div key={post.Id}>
          {post.Content}
        </div>
      ))}
    </div>
  )
}