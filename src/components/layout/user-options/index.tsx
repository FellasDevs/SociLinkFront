import { Suspense } from 'react';

import { logoutAction } from '@/actions/auth';
import { UserButton } from '@/components/global/UserButton';
import { SidebarItem } from '@/components/layout/sidebar/SidebarItem';
import { ThemeButton } from '@/components/layout/theme-button';
import { Button } from '@/components/ui/button';
import { UserRoutes } from '@/http/requests/server-side/users';

export const UserOptions = () => {
  return (
    <div className='flex h-full w-full flex-col gap-3 p-7'>
      <div className='mb-5 text-2xl'>SociLink</div>

      <Suspense>
        <GetUserArea />
      </Suspense>

      <Suspense>
        <GetLinks />
      </Suspense>

      <SidebarItem href='/search'>Pesquisa</SidebarItem>

      <div className='mt-auto'>
        <Suspense>
          <GetLogoutButton />
        </Suspense>
      </div>
    </div>
  )
}

const GetUserArea = async () => {
  const user = await UserRoutes.getSelf();

  if (!user) return null;

  return (
    <div className='mb-3'>
      <UserButton user={user} showFirstNameOnly />
    </div>
  )
}

const GetLinks = async () => {
  const user = await UserRoutes.getSelf();

  if (!user) return null;

  return (
    <>
      <SidebarItem href='/'>Início</SidebarItem>
      {/*<SidebarItem href='/messages'>Mensagens</SidebarItem>*/}
      {/*<SidebarItem href='/configs'>Configurações</SidebarItem>*/}
    </>
  )
}

const GetLogoutButton = async () => {
  const user = await UserRoutes.getSelf();

  return (
    <form action={logoutAction} className='flex flex-col gap-2'>
      <ThemeButton />
      {
        !user
          ? <SidebarItem href='/auth/signin'>Entrar</SidebarItem>
          : <Button type='submit' className='w-full rounded shadow'>
            Sair
          </Button>
      }
    </form>
  )
}