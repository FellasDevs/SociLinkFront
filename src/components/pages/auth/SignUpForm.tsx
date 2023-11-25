'use client';

import { useFormStatus } from 'react-dom';
import { useForm, UseFormReturn } from 'react-hook-form';

import { signUpAction } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignUpProps } from '@/http/requests/server-side/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const signUpSchema = z
  .object({
    email: z
      .string()
      .email({message: 'O e-mail deve ser válido'})
      .max(50, {message: 'O e-mail deve ter até 50 caracteres'}),
    name: z
      .string()
      .trim()
      .regex(/^[a-zA-Z ]*$/, {message: 'O nome não pode conter caracteres especiais ou números'})
      .min(5, {message: 'O nome deve ter ao menos 5 caracteres'})
      .max(50, {message: 'O nome deve ter até 50 caracteres'}),
    nickname: z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9]*$/, {message: 'O apelido não pode conter caracteres especiais ou espaços'})
      .min(5, {message: 'O apelido deve ter ao menos 5 caracteres'})
      .max(50, {message: 'O apelido deve ter até 50 caracteres'}),
    password: z
      .string()
      .min(6, {message: 'A senha deve ter ao menos 6 caracteres'})
      .max(50, {message: 'A senha deve ter até 50 caracteres'}),
    confirmPassword: z.string(),
    birthdate: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', name: '', nickname: '', birthdate: '', password: '', confirmPassword: '' },
  })

  const values = form.watch();

  return (
    <form
      action={signUpAction.bind(null, values)}
      className='flex flex-col space-y-6'
    >
      <GetForm form={form} />
    </form>
  )
}

const GetForm = ({ form }: { form: UseFormReturn<SignUpProps & {confirmPassword: string}> }) => {
  const { pending } = useFormStatus();

  return (
    <Form {...form}>
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
        name="nickname"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Apelido</FormLabel>
            <FormControl>
              <Input placeholder="Insira seu apelido" {...field} />
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

      <Button type="submit" isLoading={pending}>Enviar</Button>
    </Form>
  )
}