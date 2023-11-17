import { ProfileIcon } from '@/components/layout/navbar/ProfileIcon';
import { ThemeButton } from '@/components/layout/theme-button';

export const Navbar = () => {
  return (
    <div className='flex justify-end gap-5 p-2'>
      <ProfileIcon />
      <ThemeButton />
    </div>
  )
}