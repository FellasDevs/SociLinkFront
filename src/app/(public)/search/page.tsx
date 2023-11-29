import { PageProps } from '@/types/next/Page';

import { SearchPosts } from '@/components/pages/search/SearchPosts';
import { SearchUsers } from '@/components/pages/search/SearchUsers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SearchPage({ searchParams }: PageProps) {
  return (
    <div className='flex flex-col items-center p-10'>
      <div className='w-full max-w-[30em]'>
        <Tabs defaultValue="posts" className="max-w-[50em]">
          <TabsList className='mb-10 flex'>
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
    </div>
  );
}