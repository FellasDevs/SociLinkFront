import { SearchPosts } from '@/components/pages/search/SearchPosts';
import { SearchUsers } from '@/components/pages/search/SearchUsers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SearchPage() {
  return (
    <div className='flex flex-col items-center p-10'>
      <div className='w-full max-w-[30em]'>
        <Tabs defaultValue="posts" className="w-[400px]">
          <TabsList className="flex">
            <TabsTrigger value="posts" className='w-full'>Postagens</TabsTrigger>
            <TabsTrigger value="users" className='w-full'>Usuários</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <SearchPosts />
          </TabsContent>

          <TabsContent value="users">
            <SearchUsers />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}