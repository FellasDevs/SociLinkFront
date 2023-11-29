import { FriendshipRequestsList } from '@/components/layout/friendships-bar/FriendshipRequestsList';
import { FriendsList } from '@/components/layout/friendships-bar/FriendsList';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export const FriendshipsBar = () => {
  return (
    <div className='sticky right-0 top-0 hidden h-screen w-full max-w-[15em] flex-col p-3 shadow-2xl dark:border-l dark:border-l-input md:flex'>
      <div className='text-2xl'>Amizades</div>
      <ScrollArea className='grow'>
        <FriendsList />
      </ScrollArea>

      <Separator className='my-5' />

      <div className='text-2xl'>Solicitações</div>
      <ScrollArea className='shrink'>
        <FriendshipRequestsList />
      </ScrollArea>
    </div>
  )
}

