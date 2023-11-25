import {logoutAction} from "@/actions/auth";
import {Button} from '@/components/ui/button';
import { UserRoutes } from '@/http/requests/server-side/users';

export const LogoutButton = async () => {
  const user = UserRoutes.getSelf();

  if (!user) return null;

  return (
      <form action={logoutAction}>
        <Button type='submit' className='w-full rounded shadow'>
          Sair
        </Button>
      </form>
  )
}