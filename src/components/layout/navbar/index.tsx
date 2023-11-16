import { ToggleThemeBtn } from '@/components/layout/theme-provider/ToggleThemeBtn';

export const Navbar = () => {
  return (
    <div className='flex justify-end gap-5 p-2'>
      <div>Usuário aqui</div>

      <ToggleThemeBtn />
    </div>
  )
}