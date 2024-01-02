import { useMemo } from 'react';

import { CreatePostFormProps } from '@/components/global/post/create-post-form/index';
import { Button } from '@/components/ui/button';

export const PostImagesPreview = ({ form }: { form: CreatePostFormProps }) => {
  const { images } = form.watch();

  const imageUrls = useMemo(() => {
    const urls: string[] = [];

    if (!images) return urls;

    for (let i = 0; i < images.length; i++) {
      urls.push(URL.createObjectURL(images[i]));
    }

    return urls;
  }, [images]);

  return (
    <div className="flex gap-2">
      {imageUrls.toSpliced(5).map((image, i) => (
        <div
          key={'image-' + i}
          className="h-20 w-20 overflow-hidden rounded-xl"
        >
          <img
            src={image}
            className="h-full w-full object-cover"
            alt="Imagem da postagem"
          />
        </div>
      ))}

      {imageUrls.length > 5 && (
        <div className="relative h-20 w-20 overflow-hidden rounded-xl">
          <img
            src={imageUrls[5]}
            className="h-full w-full object-cover"
            alt="Imagem da postagem"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-[30%]">
            <span className="text-2xl font-bold text-white">
              +{imageUrls.length - 5}
            </span>
          </div>
        </div>
      )}

      {imageUrls.length > 0 && (
        <Button
          type="button"
          variant="ghost"
          onClick={() => form.setValue('images', undefined)}
          className="text-red-600"
        >
          X
        </Button>
      )}
    </div>
  );
};
