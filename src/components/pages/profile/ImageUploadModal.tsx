'use client';

import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export type ImageUploadModalProps = {
  action: (formData: FormData) => Promise<string>;
  children: ReactNode;
  multiple?: boolean;
  title: string;
};

export const ImageUploadModal = async ({
  children,
  multiple = false,
  action,
  title,
}: ImageUploadModalProps) => {
  const { toast } = useToast();

  const formAction = async (formData: FormData) => {
    const error = await action.bind(null, formData)();

    if (!error) return;

    toast({
      title: 'Ocorreu um erro ao enviar a imagem',
      description: error,
      variant: 'destructive',
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="text-2xl">{title}</div>
          <DialogClose />
        </DialogHeader>

        <form action={formAction} className="flex gap-1">
          <Input
            type="file"
            name="file-input"
            accept="image/*"
            multiple={multiple}
          />

          <div className="flex justify-around">
            <Button type="submit">Confirmar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
