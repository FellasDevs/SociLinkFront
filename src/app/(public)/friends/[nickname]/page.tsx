import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

import { FriendsList } from '@/components/global/friends/FriendsList';
import { UserRoutes } from '@/http/requests/server-side/users';

export const metadata: Metadata = {
  title: 'Amizades',
  description: 'Página de amizades',
};

type Props = {
  params: { nickname: string };
};

export default async function FriendsPage({ params: { nickname } }: Props) {
  const self = await UserRoutes.getSelf();
  const user = await UserRoutes.getUserByNickname(nickname);

  if (!user) {
    return (
      <div className="flex h-full flex-col justify-center gap-2 text-center">
        <div className="text-3xl">Usuário não encontrado</div>
        <Link href={'/'} className="text-2xl underline">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  const isSelf = user.Id === self?.Id;

  return (
    <div className="mx-auto flex max-h-[100vw] max-w-[50em] flex-col p-8">
      <div className="max-w-full truncate text-2xl">
        {isSelf ? 'Meus amigos' : `Amizades de ${user.Name}`}
      </div>

      <Suspense>
        <FriendsList user={user} isSelf={isSelf} showCreatedAt={true} />
      </Suspense>
    </div>
  );
}
