import Link from 'next/link';

import { UserButton } from '@/components/global/UserButton';
import { UserOptions } from '@/components/layout/user-options';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserRoutes } from '@/http/requests/server-side/users';
import { Menu } from 'lucide-react';

export const MobileNavbar = async () => {
  const user = await UserRoutes.getSelf();

  return (
    <div className='sticky top-0 z-50 flex h-16 w-full items-center gap-3 bg-background p-3 shadow-2xl dark:border-b dark:border-b-input md:hidden'>
      <Link href='/' passHref className='mr-auto'>
        <Button variant='ghost' className='text-2xl'>
          SociLink
        </Button>
      </Link>

      { !!user && <UserButton user={user} showFirstNameOnly variant='outline' /> }

      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' className='h-full rounded-lg'>
            <Menu />
          </Button>
        </DialogTrigger>

        <DialogContent className='h-full'>
          <DialogHeader>
            <DialogTitle>Opções</DialogTitle>
          </DialogHeader>

          <UserOptions />
        </DialogContent>
      </Dialog>
    </div>
  )
}