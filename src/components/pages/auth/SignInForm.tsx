'use client';

import { useFormStatus } from 'react-dom';
import { useForm, UseFormReturn } from 'react-hook-form';

import { signInAction } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {useToast} from "@/components/ui/use-toast";
import { SignInProps } from '@/http/requests/server-side/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const signInSchema = z.object({
  email: z
    .string()
    .email({message: 'O e-mail deve ser válido'})
    .max(50, {message: 'O e-mail deve ter até 50 caracteres'}),
  password: z
    .string()
    .min(6, {message: 'A senha deve ter ao menos 6 caracteres'})
    .max(50, {message: 'A senha deve ter até 50 caracteres'}),
})

export const SignInForm = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });

  const { toast } = useToast();

  const action = async () => {
      await form.trigger();
      if (!form.formState.isValid) return;

      const values = form.getValues();

      const error = await (signInAction.bind(null, values))();

      if (!error) return;

      toast({
          title: 'Ocorreu um erro ao entrar em sua conta.',
          description: error,
          variant: 'destructive',
      });
  }

  return (
    <form
      action={action}
      className='flex flex-col space-y-6'
    >
      <GetForm form={form} />
    </form>
  )
}

const GetForm = ({ form }: { form: UseFormReturn<SignInProps> }) => {
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

      <Button type="submit" isLoading={pending}>Enviar</Button>
    </Form>
  )
}