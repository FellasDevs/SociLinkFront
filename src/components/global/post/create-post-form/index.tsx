'use client';

import { useFormStatus } from 'react-dom';
import { useForm, UseFormReturn } from 'react-hook-form';

import { Post } from '@/types/models/Post';

import { PostImagesDropdown } from './PostImagesDropdown';
import { PostImagesPreview } from './PostImagesPreview';
import { VisibilityDropdown } from './PostVisibilityDropdown';

import { createPostAction, editPostAction } from '@/actions/posts';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { CreatePostParams } from '@/http/requests/server-side/posts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tag } from 'lucide-react';
import * as z from 'zod';

type Props = {
  post?: Post;
  isEdit?: boolean;
  originalPostId?: string;
  onCreate?: () => void;
};

export type CreatePostFormProps = UseFormReturn<
  Omit<CreatePostParams, 'images'> & { images?: FileList }
>;

export const CreatePostForm = ({
  onCreate,
  post,
  isEdit,
  originalPostId,
}: Props) => {
  const CreatePostSchema = z
    .object({
      content: z
        .string()
        .min(1, { message: 'Conteúdo da postagem não pode estar vazio' })
        .max(500, { message: 'Postagem deve conter no máximo 500 caracteres' }),
      visibility: z.enum(['public', 'friends', 'private']),
      images: z.instanceof(FileList).optional(),
    })
    .refine((data) => data.content !== post?.Content, {
      message: 'O conteúdo da postagem não mudou',
      path: ['content'],
    });

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      content: post?.Content ?? '',
      visibility: post?.Visibility ?? 'public',
      images: undefined,
    },
  });

  const { toast } = useToast();

  const action = async () => {
    await form.trigger();
    if (!form.formState.isValid) return;

    const values = form.getValues();

    const imageStrings: string[] = [];

    if (values.images && !!values.images.length) {
      if (values.images.length > 2) {
        toast({
          title: 'Ocorreu um erro ao criar a sua postagem',
          description: 'Máximo de 2 imagens por postagem',
          variant: 'destructive',
        });

        return;
      }

      for (let i = 0; i < values.images.length; i++) {
        const file = values.images.item(i)!;

        if (file.size > 2000000) {
          toast({
            title: 'Ocorreu um erro ao criar a sua postagem',
            description: `Imagem ${i + 1} muito grande! (Máximo de 2MB)`,
            variant: 'destructive',
          });

          return;
        }

        const arrayBuffer = await file.arrayBuffer();

        imageStrings.push(new Uint8Array(arrayBuffer).toString());
      }
    }

    const error =
      isEdit && !!post
        ? await editPostAction.bind(null, {
            ...values,
            images: imageStrings,
            id: post.Id,
            lastPictures: post.Images,
          })()
        : await createPostAction.bind(null, {
            ...values,
            images: imageStrings,
            originalPostId,
          })();

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
  };

  return (
    <form
      action={action}
      className="flex w-full max-w-[50em] flex-col gap-3 rounded-xl bg-card p-6 shadow-lg dark:border dark:border-input"
    >
      <PostForm form={form} isEdit={!!post} />
    </form>
  );
};

const PostForm = ({
  form,
  isEdit,
}: {
  form: CreatePostFormProps;
  isEdit: boolean;
}) => {
  const { pending } = useFormStatus();

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder="Escreva sua postagem aqui"
                className="h-full resize-none rounded-xl border-2 text-lg"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <PostImagesPreview form={form} />

      <div className="flex justify-around rounded-xl border-2 border-input p-1">
        <PostImagesDropdown form={form} />

        <Button type="button" variant="ghost">
          <Tag />
        </Button>

        <VisibilityDropdown form={form} />
      </div>

      <Button
        type="submit"
        isLoading={pending}
        className="rounded-xl text-lg"
        disabled={!form.formState.isValid}
      >
        {isEdit ? 'Editar' : 'Criar'} postagem
      </Button>
    </Form>
  );
};
