'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const signInSchema = z.object({
  email: z.string().email({message: 'O e-mail deve ser válido'}).max(50, {message: 'O e-mail deve ter até 50 caracteres'}),
  password: z.string().min(6, {message: 'A senha deve ter ao menos 6 caracteres'}).max(50, {message: 'A senha deve ter até 50 caracteres'}),
})

export const SignInForm = () => {
  const { signIn } = useAuth();

  const [ isLoading, setIsLoading ] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    await signIn(form.getValues())
    setIsLoading(false);
  }
  
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '',password: '' },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-6'>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Insira seu e-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Insira sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" isLoading={isLoading}>Enviar</Button>
      </form>
    </Form>
  )
}