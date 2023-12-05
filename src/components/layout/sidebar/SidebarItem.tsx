import Link from 'next/link';
import {FC, ReactNode} from 'react';

import {Button} from '@/components/ui/button';

type Props = {
    children: ReactNode;
    href: string;
}

export const SidebarItem: FC<Props> = ({children, href}) => {
    return (
        <Link href={href} passHref className='w-full'>
            <Button className='w-full'>
                {children}
            </Button>
        </Link>
    )
}