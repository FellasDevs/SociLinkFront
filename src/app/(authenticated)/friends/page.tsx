import { Metadata } from 'next';

import { FriendsArea } from '@/components/global/friends';

export const metadata: Metadata = {
  title: 'Amizades',
  description: 'Minhas amizades',
};

export default function MyFriendsPage() {
  return (
    <div className="mx-auto flex max-h-[100vw] max-w-[50em] flex-col p-8">
      <FriendsArea />
    </div>
  );
}
