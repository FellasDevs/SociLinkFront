'use client';

import { useMemo } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm, UseFormReturn } from 'react-hook-form';

import { Post } from '@/types/models/Post';

import { createPostAction } from '@/actions/posts';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { CreatePostParams } from '@/http/requests/server-side/posts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Globe2, ImagePlus, Tag, User, Users } from 'lucide-react';
import * as z from 'zod';

type Props = {
    post?: Post;
    createFunction?: (params: CreatePostParams) => Promise<string | null>;
    onCreate?: () => void;
}

export const CreatePostForm = ({ onCreate, post, createFunction }: Props) => {
    const CreatePostSchema = z.object({
        content: z
          .string()
          .min(1, {message: 'Conteúdo da postagem não pode estar vazio'})
          .max(500, {message: 'Postagem deve conter no máximo 500 caracteres'}),
        visibility: z.enum(['public', 'friends', 'private']),
        images: z.array(z.string().url())
    }).refine((data) => data.content !== post?.Content, {
        message: 'O conteúdo da postagem não mudou',
        path: ['content'],
    });

    const form = useForm<z.infer<typeof CreatePostSchema>>({
        resolver: zodResolver(CreatePostSchema),
        defaultValues: { content: post?.Content ?? '', visibility: post?.Visibility ?? 'public', images: post?.Images ?? [] },
    });

    const { toast } = useToast();

    const action = async () => {
        await form.trigger();
        if (!form.formState.isValid) return;

        const values = form.getValues();

        const error =
          createFunction
            ? await createFunction(values)
            : await (createPostAction.bind(null, values))();

        if (!error) {
            onCreate?.();
            form.reset();
            return;
        }

        toast({
            title: 'Ocorreu um erro ao criar a sua postagem',
            description: error,
            variant: 'destructive',
        });
    }

    return (
        <form
            action={action}
            className='flex w-full max-w-[50em] flex-col gap-3 rounded-xl bg-card p-6 shadow-lg dark:border dark:border-input'
        >
            <PostForm form={form} isEdit={!!post} />
        </form>
    )
}

const PostForm = ({ form, isEdit }: { form: UseFormReturn<CreatePostParams>; isEdit: boolean }) => {
    const { pending } = useFormStatus();

    return (
        <Form {...form}>
            <FormField
                control={form.control}
                name='content'
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Textarea
                                placeholder='Escreva sua postagem aqui'
                                className='h-full resize-none rounded-xl border-2 text-lg'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <div className='flex justify-around rounded-xl border-2 border-input p-1'>
                <Button type='button' variant='ghost'>
                    <ImagePlus/>
                </Button>

                <Button type='button' variant='ghost'>
                    <Tag/>
                </Button>

                <VisibilityDropdown form={form}/>
            </div>

            <Button type='submit' isLoading={pending} className='rounded-xl text-lg' disabled={!form.formState.isValid}>
                {isEdit ? 'Editar' : 'Criar'} postagem
            </Button>
        </Form>
    )
}

const VisibilityDropdown = ({form}: { form: UseFormReturn<CreatePostParams> }) => {
    const {visibility} = form.watch();

    const DropDownIcon = useMemo(() => {
        switch (visibility) {
            case 'public':
                return <Globe2/>
            case 'friends':
                return <Users/>
            case 'private':
                return <User/>
        }
    }, [visibility])

    return (
        <FormField
            control={form.control}
            name='visibility'
            render={({field}) => (
                <FormItem>
                    <FormControl>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button type='button' variant='ghost'>
                                    {DropDownIcon}
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Visibilidade da postagem</DropdownMenuLabel>

                                <DropdownMenuSeparator/>

                                <DropdownMenuRadioGroup value={field.value} onValueChange={field.onChange}>
                                    <DropdownMenuRadioItem value='public' className='flex gap-3'>
                                        <Globe2/>
                                        <span>Publico</span>
                                    </DropdownMenuRadioItem>

                                    <DropdownMenuRadioItem value='friends' className='flex gap-3'>
                                        <Users/>
                                        <span>Amigos</span>
                                    </DropdownMenuRadioItem>

                                    <DropdownMenuRadioItem value='private' className='flex gap-3'>
                                        <User/>
                                        <span>Privado</span>
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </FormControl>
                </FormItem>
            )}
        />
    )
}