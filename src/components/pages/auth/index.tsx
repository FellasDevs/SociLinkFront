'use client'

import { FC, useState } from 'react';

import { SignInForm } from '@/components/pages/auth/SignInForm';
import { SignUpForm } from '@/components/pages/auth/SignUpForm';
import { Button } from '@/components/ui/button';

export const AuthComponent: FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? <SignInForm /> : <SignUpForm />}

      <div className='mt-10 flex items-center justify-end space-x-3 text-center'>
        <h3>{isLogin ? 'Ainda não' : 'Já'} possúi uma conta?</h3>

        <Button onClick={() =>setIsLogin(!isLogin)}>
          Clique aqui!
        </Button>
      </div>
    </div>
  );
}