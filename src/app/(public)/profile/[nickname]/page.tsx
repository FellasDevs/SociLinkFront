import {Metadata} from 'next';
import {Suspense} from 'react';

import {Loader} from '@/components/global/Loader';
import {ProfileHeader} from '@/components/profile/ProfileHeader';
import {Separator} from '@/components/ui/separator';
import {PostRoutes} from "@/http/requests/server-side/posts";

export const metadata: Metadata = {
  title: 'Perfil',
  description: 'Perfil do usuário',
}

type Props = {
  params: { nickname: string }
}

export default function ProfilePage({ params: { nickname } }: Props) {
  return (
    <div className='flex min-h-[90%] flex-col'>
      <Suspense fallback={<UserLoading />}>
        <GetProfile nickname={nickname} />
      </Suspense>
    </div>
  )
}

const UserLoading = () => {
  return (
    <div className='m-auto flex items-center'>
      <Loader size={50} />
      <span className='text-2xl'>Carregando usuário...</span>
    </div>
  )
}

const GetProfile = async ({ nickname }: { nickname: string }) => {
  const response = await PostRoutes.GetUserTimelineRequest(nickname);

  if (!response) return <div className='m-auto text-2xl'>Usuário não encontrado.</div>;

  return (
    <div>
      <ProfileHeader user={response.User} />

      <Separator />

      <div className='m-3 flex flex-col items-center gap-5'>
        {response.Posts.map(post => (
          <div key={post.Id} className='min-w-[20em] rounded border-2 p-5'>
            <div className='flex items-center'>
              <div>{post.User.Name}</div>
            </div>
            <div>{post.Content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}