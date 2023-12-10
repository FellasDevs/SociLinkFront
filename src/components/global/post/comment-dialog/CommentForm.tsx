import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type Props = {
    action: (content: string) => Promise<void>;
    isLoading: boolean;
    initialValue?: string;
}

export const CommentForm = ({ action, isLoading, initialValue }: Props) => {
    const CommentSchema = z.object({
        content: z
            .string()
            .min(1, {message: 'Conteúdo do comentário não pode estar vazio'})
            .max(500, {message: 'Comentário deve conter no máximo 500 caracteres'}),
    }).refine((data) => data.content !== initialValue, {
        message: 'O conteúdo do comentário não mudou',
        path: ['content'],
    });

    const form = useForm<z.infer<typeof CommentSchema>>({
        resolver: zodResolver(CommentSchema),
        defaultValues: { content: initialValue ?? '' },
    });

    const onSubmit = form.handleSubmit(async (data) => {
        await action(data.content);
        form.reset();
    });

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className='flex h-full w-full flex-col gap-2'>
                <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder='Escreva seu comentário aqui'
                                    className='h-full resize-none rounded-xl border-2 text-lg'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' isLoading={isLoading} disabled={!form.formState.isValid}>
                    Criar comentário
                </Button>
            </form>
        </Form>
    )
}
