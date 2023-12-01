'use client'

import {useFormStatus} from "react-dom";
import {useForm, UseFormReturn} from "react-hook-form";

import {createCommentAction} from "@/actions/posts";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {useToast} from "@/components/ui/use-toast";
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
    const form = useForm<z.infer<typeof CommentSchema>>({
        resolver: zodResolver(CommentSchema),
        defaultValues: { content: '' },
    });

    const { toast } = useToast();

    const action = async () => {
        await form.trigger();
        if (!form.formState.isValid) return;

        const { content } = form.getValues();

        const error = await (createCommentAction.bind(null, { postId, content }))();

        if (!error) return;

        toast({
            title: 'Ocorreu um erro ao criar a sua postagem',
            description: error,
            variant: 'destructive',
        });
    }

    return (
        <form
            action={action}
            className='flex w-full flex-col gap-3 '
        >
            <GetForm form={form} />
        </form>
    )
}

const GetForm = ({ form }: { form: UseFormReturn<{ content: string }> }) => {
    const { pending } = useFormStatus();

    return (
        <Form {...form}>
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

            <Button type='submit' isLoading={pending} className='rounded-xl'>
                Enviar
            </Button>
        </Form>
    )
}