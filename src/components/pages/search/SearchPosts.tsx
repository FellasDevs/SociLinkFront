'use client'

import { useEffect, useState } from 'react';

import { PaginationRequest } from '@/types/http/Pagination';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSearchPosts } from '@/hooks/queries/search/useSearchPosts';

export const SearchPosts = () => {
  const [ pagination, setPagination ] = useState<PaginationRequest>({ page: 1, pageSize: 20 });
  const [ search, setSearch ] = useState('');

  const { data: posts, isLoading } = useSearchPosts({
    query: search,
    pagination,
  })

  return (
    <div className=''>
      <Label className='text-xl'>Pesquisar</Label>
      <Input
        className='grow'
        placeholder='Pesquise aqui'
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />

      <div>
        {posts?.Posts?.map((post) => (
          <div key={post.Id}>{post.Content}</div>
        ))}
      </div>
    </div>
  )
}