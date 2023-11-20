import { Suspense } from 'react';

import { LogoutButton } from '@/components/layout/sidebar/LogoutButton';
import { SidebarItem } from '@/components/layout/sidebar/SidebarItem';
import { GetSelfRequest } from '@/http/requests/server-side/users';

export const Sidebar = () => {
  return (
    <div className='sticky left-0 top-0 h-screen p-7 shadow-2xl dark:border-r dark:border-r-amber-50'>
        <div className='flex h-full flex-col'>
          <h3>SociLink</h3>

          <Suspense>
            <UserName />
          </Suspense>

          <div className='[&>div]:hover:bg-info flex flex-col gap-4 pt-7'>
            <SidebarItem href='/'>Início</SidebarItem>
            <Suspense>
              <ProfileButton />
            </Suspense>
            <SidebarItem href='/search'>Pesquisa</SidebarItem>
            <SidebarItem href='/messages'>Mensagens</SidebarItem>
            <SidebarItem href='/friends'>Amigos</SidebarItem>
            <SidebarItem href='/configs'>Configurações</SidebarItem>
          </div>

          <div className='mt-auto'>
            <LogoutButton />
          </div>
        </div>
    </div>
  )
}

const UserName = async () => {
  const user = await GetSelfRequest();

  if (!user) return null;

  return <>Olá {user.Name.split(' ')[0]}</>
}

const ProfileButton = async () => {
  const user = await GetSelfRequest();

  if (!user) return null;

  return <SidebarItem href={`/profile/${user.Nickname}`}>Perfil</SidebarItem>
}