import { Suspense } from 'react';

import { PageQueryParams } from '@/types/next/Page';

import { PaginationComponent } from '@/components/pages/search/client-side/PaginationComponent';
import { SearchArea } from '@/components/pages/search/client-side/SearchArea';
import { PostRoutes } from '@/http/requests/server-side/posts';

export const SearchPosts = ({ params }: { params: PageQueryParams }) => {
  return (
    <div className='flex flex-col gap-10'>
      <Suspense>
        <SearchArea initialSearch={params.search as string ?? ''} />
      </Suspense>

      <Suspense>
        <GetPosts params={params} />
      </Suspense>
    </div>
  )
}

const GetPosts = async ({ params }: { params: PageQueryParams }) => {
  const page = isNaN(Number(params.page)) ? 1 : Number(params.page);
  const pageSize = isNaN(Number(params.pageSize)) ? 3 : Number(params.pageSize);

  const response = await PostRoutes.searchPosts({
    query: params.search as string ?? '',
    pagination: { page, pageSize },
  });

  if (!response || !response.Posts)
    return <div className='text-2xl'>Ocorreu um problema ao procurar as postagens. Tente novamente mais tarde</div>;

  if (!response.Posts.length)
    return <div className='text-2xl'>Nenhuma postagem encontrada</div>;

  const { Posts, PageSize, Page, TotalCount } = response;

  return (
    <PaginationComponent paginationProps={{ TotalCount, Page, PageSize }}>
      {Posts.map((post, i) => (
        <div key={post.Id}>
          {i + 1}: {post.Content}
        </div>
      ))}
    </PaginationComponent>
  )
}

