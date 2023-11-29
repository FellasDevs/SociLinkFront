import {Suspense} from 'react';

import {PageQueryParams} from '@/types/next/Page';

import {SearchArea} from '@/components/pages/search/client-side/SearchArea';
import {ServerSidePostRoutes} from '@/http/requests/server-side/posts';
import {PostCard} from "@/components/global/timeline/postCard";

export const SearchPosts = ({params}: { params: PageQueryParams }) => {
    return (
        <div className='flex flex-col gap-10'>
            <Suspense>
                <SearchArea initialSearch={params.search as string ?? ''}/>
            </Suspense>

            <Suspense>
                <GetPosts params={params}/>
            </Suspense>
        </div>
    )
}

const GetPosts = async ({params}: { params: PageQueryParams }) => {
    const page = isNaN(Number(params.page)) ? 1 : Number(params.page);
    const pageSize = isNaN(Number(params.pageSize)) ? 3 : Number(params.pageSize);

    const posts = await ServerSidePostRoutes.searchPosts({
        query: params.search as string ?? '',
        pagination: {page, pageSize},
    });

    if (!posts)
        return <div className='text-2xl'>Ocorreu um problema ao procurar as postagens. Tente novamente mais tarde</div>;

    if (!posts.length)
        return <div className='text-2xl'>Nenhuma postagem encontrada</div>;

    return (
        <div className='m-3 flex flex-col items-center gap-5'>
            {posts.map((post, i) => (
                <PostCard post={post} key={i}/>
            ))}
        </div>
    )
}

