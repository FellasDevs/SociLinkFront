import { Suspense } from 'react';

import { LogoutButton } from '@/components/layout/sidebar/LogoutButton';
import { SidebarItem } from '@/components/layout/sidebar/SidebarItem';
import { GetSelfRequest } from '@/http/requests/users';

export const Sidebar = () => {
  return (
    <div className='sticky left-0 top-0 h-screen p-7 shadow-2xl dark:border-r dark:border-r-amber-50'>
        <div className='flex h-full flex-col'>
          <h3>SociLink</h3>

          <Suspense fallback={<div>Carregando...</div>}>
            <UserName />
          </Suspense>

          <div className='[&>div]:hover:bg-info flex flex-col gap-4 pt-7'>
            <SidebarItem href='/'>Início</SidebarItem>
            <SidebarItem href='/profile'>Perfil</SidebarItem>
            <SidebarItem href='/alo'>Pesquisa</SidebarItem>
            <SidebarItem href='/alo'>Mensagens</SidebarItem>
            <SidebarItem href='/alo'>Amigos</SidebarItem>
            <SidebarItem href='/alo'>Configurações</SidebarItem>
          </div>

          <LogoutButton />
        </div>
    </div>
  )
}

const UserName = async () => {
  const user = await GetSelfRequest();

  if (!user) return null;

  return (
    <>Olá {user.Name.split(' ')[0]}</>
  );
}