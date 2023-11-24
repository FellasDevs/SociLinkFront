import {logoutAction} from "@/actions/auth";
import {Button} from '@/components/ui/button';
import {GetSelfRequest} from "@/http/requests/server-side/users";

export const LogoutButton = async () => {
  const user = GetSelfRequest();

  if (!user) return null;

  return (
      <form action={logoutAction}>
        <Button type='submit' className='w-full rounded shadow'>
          Sair
        </Button>
      </form>
  )
}