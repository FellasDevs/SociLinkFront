import { UserOptions } from '@/components/layout/user-options';

export const Sidebar = () => {
  return (
    <div className='sticky left-0 top-0 hidden h-screen w-full max-w-[15em] bg-background shadow-2xl dark:border-r dark:border-r-input md:flex'>
      <UserOptions />
    </div>
  )
}