import { Metadata } from 'next';

import { PageProps } from '@/types/next/Page';

import { SearchPosts } from '@/components/pages/search/SearchPosts';
import { SearchUsers } from '@/components/pages/search/SearchUsers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: 'Pesquisa',
  description: 'Pesquise por postagens e usuários',
}

export default function SearchPage({ searchParams }: PageProps) {
  return (
    <div className='flex w-full flex-col items-center p-10'>
      <Tabs defaultValue='posts' className='w-full'>
        <TabsList className='mx-auto mb-10 flex w-full max-w-[30em]'>
          <TabsTrigger value='posts' className='w-full'>Postagens</TabsTrigger>
          <TabsTrigger value='users' className='w-full'>Usuários</TabsTrigger>
        </TabsList>

        <TabsContent value='posts'>
          <SearchPosts params={searchParams} />
        </TabsContent>

        <TabsContent value='users'>
          <SearchUsers params={searchParams} />
        </TabsContent>
      </Tabs>
    </div>
  );
}