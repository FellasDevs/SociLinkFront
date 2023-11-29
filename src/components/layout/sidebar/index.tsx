import { Suspense } from 'react';

import { logoutAction } from '@/actions/auth';
import { UserButton } from '@/components/global/UserButton';
import { SidebarItem } from '@/components/layout/sidebar/SidebarItem';
import { ThemeButton } from '@/components/layout/theme-button';
import { Button } from '@/components/ui/button';
import { UserRoutes } from '@/http/requests/server-side/users';

export const Sidebar = () => {
  return (
    <div className='sticky left-0 top-0 flex h-screen w-full max-w-[13em] flex-col justify-between p-7 shadow-2xl dark:border-r dark:border-r-amber-50'>
      <div className='mx-auto mb-5 text-2xl'>SociLink</div>

      <Suspense>
        <GetUserArea />
      </Suspense>

      <div className='[&>div]:hover:bg-info flex flex-col gap-4 pt-7'>
        <Suspense>
          <GetLinks />
        </Suspense>
        <SidebarItem href='/search'>Pesquisa</SidebarItem>
      </div>

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

  return <UserButton user={user} showFirstNameOnly />
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