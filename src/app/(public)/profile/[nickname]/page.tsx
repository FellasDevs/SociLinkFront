import { Metadata } from 'next';
import { Suspense } from 'react';

import { LoaderWithText } from '@/components/global/Loader';
import { ProfileHeader } from '@/components/pages/profile/ProfileHeader';
import { ProfileTimeline } from '@/components/pages/profile/ProfileTimeline';
import { Separator } from '@/components/ui/separator';
import { GetProfileTimelineParams, ServerSidePostRoutes } from '@/http/requests/server-side/posts';

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
      <LoaderWithText size={50} />
    </div>
  )
}

const GetProfile = async ({ nickname }: { nickname: string }) => {
  const params: GetProfileTimelineParams = {
    nickname,
    page: 1,
    pageSize: 10,
  }

  const response = await ServerSidePostRoutes.getUserTimeline(params);

  if (!response) return <div className='m-auto text-2xl'>Usuário não encontrado.</div>;

  return (
    <>
      <ProfileHeader user={response.User} />

      <Separator />

      <div className='p-5'>
        <ProfileTimeline initialData={response.Posts} params={params} />
      </div>
    </>
  )
}