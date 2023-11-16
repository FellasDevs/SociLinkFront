import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  href: string;
}

export const SidebarItem: FC<Props> = ({ children, href }) => {
  return (
    <a href={href} className='rounded-lg bg-primary p-2 text-bg-light hover:bg-info'>
      {children}
    </a>
  )
}