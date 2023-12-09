'use client';

import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

import { searchPostsAction } from '@/actions/posts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const SearchArea = ({ initialSearch }: { initialSearch: string }) => {
  const pathName = usePathname();

  const [ search, setSearch ] = useState(initialSearch);

  const newParams = useMemo(() => {
      const params = new URLSearchParams();
      search ? params.set('search', search) : params.delete('search');

      return params.toString();
    },
    [search]
  )

  return (
    <form action={searchPostsAction.bind(null, pathName, newParams)} className='flex flex-col gap-3'>
      <Label className='text-xl'>Pesquisar</Label>

      <Input
        className='grow'
        placeholder='Pesquise aqui'
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />

      <Button type='submit' disabled={search === initialSearch}>
        Pesquisar
      </Button>
    </form>
  )
}