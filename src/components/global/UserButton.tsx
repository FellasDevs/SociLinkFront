import Link from 'next/link';

import {User} from '@/types/models/User';

import {UserAvatar} from "@/components/global/UserAvatar";
import {Button, ButtonProps} from '@/components/ui/button';

type Props = ButtonProps & {
    user: User;
    showFirstNameOnly?: boolean; 
}

export const UserButton = ({user, showFirstNameOnly, className,  ...props}: Props) => {
    const name = showFirstNameOnly ? user.Name.split(' ')[0] : user.Name;

    return (
        <Link href={`/profile/` + user.Nickname} passHref>
            <Button className={'flex h-max w-full gap-2 justify-center px-2 py-1' + className} {...props}>
                <UserAvatar user={user}/>

                <span className='truncate text-lg'>
                  {name}
                </span>
            </Button>
        </Link>
    )
}