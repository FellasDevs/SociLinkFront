import { CreatePostFormProps } from '@/components/global/post/create-post-form/index';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ImagePlus } from 'lucide-react';

export const PostImagesDropdown = ({ form }: { form: CreatePostFormProps }) => {
  return (
    <FormField
      control={form.control}
      name="images"
      render={() => (
        <FormItem>
          <FormControl>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="ghost">
                  <ImagePlus />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>Imagens da postagem</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <Input
                  type="file"
                  multiple={true}
                  accept="image/*"
                  onChange={async (e) =>
                    form.setValue('images', e.currentTarget.files ?? undefined)
                  }
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
