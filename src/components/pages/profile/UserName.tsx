'use client'

import {Button} from "@/components/ui/button";
import {Check, PencilLine} from "lucide-react";
import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {editUserAction} from "@/actions/profile";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useState} from "react";

type Props = {
    userName?: string;
}

export const UserName = ({userName}: Props) => {
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing) return <UserNameForm userName={userName} setIsEditing={setIsEditing}/>

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
                <div className='text-2xl'>{userName}</div>

                <Button size={"sm"} variant='ghost' onClick={() => setIsEditing(true)}>
                    <PencilLine/>
                </Button>
            </div>
        </div>
    )
}

const UserNameForm = ({userName, setIsEditing}: { userName?: string, setIsEditing: (isEditing: boolean) => void }) => {
    const CreateEditUserSchema = z.object({
        userName: z.string().min(1, {message: 'Nome de usuário não pode estar vazio'}).max(30, {message: 'Nome de usuário deve conter no máximo 30 caracteres'}),
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
    }

    return (
        <Form {...form}>
            <form action={action} className='flex h-full w-full gap-2'>
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

                <Button type='submit' variant='success' className='rounded-xl'>
                    <Check/>
                </Button>
            </form>
        </Form>)
}