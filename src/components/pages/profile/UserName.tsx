'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { editUserAction } from '@/actions/profile';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, PencilLine, X } from 'lucide-react';
import * as z from 'zod';


type Props = {
    userName: string;
    canEdit: boolean;
}

export const UserName = ({ userName, canEdit }: Props) => {
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing && canEdit) return <UserNameForm userName={userName} setIsEditing={setIsEditing}/>

    return (
        <div className='flex items-center gap-1'>
            <div className='text-xl'>{userName}</div>

            {
                canEdit && (
                    <Button size={'sm'} variant='ghost' onClick={() => setIsEditing(true)}>
                        <PencilLine/>
                    </Button>
              )
            }
        </div>
    )
}

const UserNameForm = ({userName, setIsEditing}: { userName?: string, setIsEditing: (isEditing: boolean) => void }) => {
    const CreateEditUserSchema = z.object({
        userName: z
          .string()
          .min(1, {message: 'Nome de usuário não pode estar vazio'})
          .max(30, {message: 'Nome de usuário deve conter no máximo 30 caracteres'}),
    }).refine((data) => data.userName !== userName, {
        message: 'O nome não mudou',
        path: ['userNames'],
    });

    const form = useForm<z.infer<typeof CreateEditUserSchema>>({
        resolver: zodResolver(CreateEditUserSchema),
        defaultValues: {userName},
    });

    const action = async () => {
        await form.trigger();
        if (!form.formState.isValid) return;

        const values = form.getValues();

        await (editUserAction.bind(null, {name: values.userName}))();

        setIsEditing(false);
    };

    return (
        <Form {...form}>
            <form action={action} className='flex h-full w-full gap-1'>
                <FormField
                    control={form.control}
                    name='userName'
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder='Escreva o novo nome aqui'
                                    className='h-full text-lg'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button type='submit' variant='success' disabled={!form.formState.isValid}>
                    <Check />
                </Button>

                <Button type='button' variant='error' onClick={() => setIsEditing(false)}>
                    <X />
                </Button>
            </form>
        </Form>)
}