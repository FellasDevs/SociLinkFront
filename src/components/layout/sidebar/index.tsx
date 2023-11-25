import Link from 'next/link';
import {Suspense} from 'react';

import { logoutAction } from '@/actions/auth';
import { LogoutButton } from '@/components/layout/sidebar/LogoutButton';
import { SidebarItem } from '@/components/layout/sidebar/SidebarItem';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { UserRoutes } from '@/http/requests/server-side/users';

export const Sidebar = () => {
  return (
    <div className='sticky left-0 top-0 h-screen p-7 shadow-2xl dark:border-r dark:border-r-amber-50'>
        <div className='flex h-full flex-col justify-between'>
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
    </div>
  )
}

const GetUserArea = async () => {
  const user = await UserRoutes.getSelf();

  if (!user) return null;

  return (
      <SidebarItem href={`/profile/${user.Nickname}`}>
          <div className='my-2 flex items-center gap-2'>
              <Avatar>
                  <AvatarImage src={user.Picture} />
                  <AvatarFallback>{user.Name[0]}</AvatarFallback>
              </Avatar>

              <div className='text-lg'>
                  {user.Name.split(' ')[0]}
              </div>
          </div>
      </SidebarItem>
  )
}

const GetLinks = async () => {
  const user = await UserRoutes.getSelf();

  if (!user) return null;

  return (
      <>
        <SidebarItem href='/'>Início</SidebarItem>
        <SidebarItem href='/messages'>Mensagens</SidebarItem>
        <SidebarItem href='/friends'>Amigos</SidebarItem>
        <SidebarItem href='/configs'>Configurações</SidebarItem>
      </>
  )
}

const GetLogoutButton = async () => {
  const user = await UserRoutes.getSelf();

  if (!user)
    return <SidebarItem href='/auth/signin'>Entrar</SidebarItem>;

  return (
    <form action={logoutAction}>
      <Button type='submit' className='w-full rounded shadow'>
        Sair
      </Button>
    </form>
  )
}