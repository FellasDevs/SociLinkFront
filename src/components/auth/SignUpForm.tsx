'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const signUpSchema = z
  .object({
    email: z.string().email({message: 'O e-mail deve ser válido'}).max(50, {message: 'O e-mail deve ter até 50 caracteres'}),
    password: z.string().min(6, {message: 'A senha deve ter ao menos 6 caracteres'}).max(50, {message: 'A senha deve ter até 50 caracteres'}),
    confirmPassword: z.string(),
    name: z.string().trim().regex(/^[a-zA-Z ]*$/, {message: 'O nome deve ser válido'}).min(5, {message: 'O nome deve ter ao menos 5 caracteres'}).max(50, {message: 'O nome deve ter até 50 caracteres'}),
    birthdate: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"], // path of error
  });

export const SignUpForm = () => {
  const { signUp } = useAuth();

  const [ isLoading, setIsLoading ] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    await signUp(form.getValues())
    setIsLoading(false);
  }

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', name: '', birthdate: '', password: '', confirmPassword: '' },
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
                <Input type='email' placeholder="Insira seu e-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Insira seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de nascimento</FormLabel>
              <FormControl>
                <Input type='date' placeholder="Insira sua data de nascimento" {...field} />
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme sua senha</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Insira sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} isLoading={isLoading}>Enviar</Button>
      </form>
    </Form>
  )
}