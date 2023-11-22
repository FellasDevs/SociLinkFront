import { ClientPostRoutes, SearchPostsParams } from '@/http/requests/client-side/posts';
import { useQuery } from '@tanstack/react-query';

export const useSearchPosts = (params: SearchPostsParams) => {
  return useQuery({
    queryKey: ['searchPosts', params],
    queryFn: async () => {
      return await ClientPostRoutes.SearchPostsRequest(params);
    },
    enabled: !!params.query,
  });
}