import { SidebarItem } from '@/components/layout/sidebar/SidebarItem';

export const Sidebar = () => {
    return (
        <div className='flex min-h-max flex-col bg-bg-dark p-7'>
            <h3>Soci Link</h3>

            <div className='flex flex-col gap-4 pt-7 [&>div]:hover:bg-info'>
                <SidebarItem href='/alo'>Início</SidebarItem>
                <SidebarItem href='/alo'>Perfil</SidebarItem>
                <SidebarItem href='/alo'>Pesquisa</SidebarItem>
                <SidebarItem href='/alo'>Mensagens</SidebarItem>
                <SidebarItem href='/alo'>Amigos</SidebarItem>
                <SidebarItem href='/alo'>Configurações</SidebarItem>
            </div>

            <div className='mt-auto'>Sair</div>
        </div>
    )
}