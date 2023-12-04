'use client'

import {FormEvent} from "react";
import {useForm} from "react-hook-form";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {useToast} from "@/components/ui/use-toast";
import {useCreateComment} from "@/hooks/mutations/comments/useCreateComment";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

const CommentSchema = z.object({
    content: z
        .string()
        .min(1, {message: 'Conteúdo do comentário não pode estar vazio'})
        .max(500, {message: 'Comentário deve conter no máximo 500 caracteres'}),
})

type Props = {
    postId: string;
}

export const CommentForm = ({ postId }: Props) => {
    const { mutateAsync: createComment, isPending } = useCreateComment();

    const form = useForm<z.infer<typeof CommentSchema>>({
        resolver: zodResolver(CommentSchema),
        defaultValues: { content: '' },
    });

    const { toast } = useToast();

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        await form.trigger()
        if (!form.formState.isValid) return


        const data = await createComment({
            postId,
            content: form.getValues().content,
        });

        if (!!data) return;

        toast({
           title: "Erro",
           description: 'Ocorreu um erro ao criar seu comentário',
           variant: 'destructive',
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={onSubmit}>
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

                <Button type='submit' isLoading={isPending} className='rounded-xl'>
                    Enviar
                </Button>
            </form>
        </Form>
    )
}
