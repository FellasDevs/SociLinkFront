import { useMemo } from 'react';

import { CreatePostFormProps } from '@/components/global/post/create-post-form/index';
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
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Globe2, User, Users } from 'lucide-react';

export const VisibilityDropdown = ({ form }: { form: CreatePostFormProps }) => {
  const { visibility } = form.watch();

  const DropDownIcon = useMemo(() => {
    switch (visibility) {
      case 'public':
        return <Globe2 />;
      case 'friends':
        return <Users />;
      case 'private':
        return <User />;
    }
  }, [visibility]);

  return (
    <FormField
      control={form.control}
      name="visibility"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="ghost">
                  {DropDownIcon}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Visibilidade da postagem</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuRadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <DropdownMenuRadioItem value="public" className="flex gap-3">
                    <Globe2 />
                    <span>Publico</span>
                  </DropdownMenuRadioItem>

                  <DropdownMenuRadioItem value="friends" className="flex gap-3">
                    <Users />
                    <span>Amigos</span>
                  </DropdownMenuRadioItem>

                  <DropdownMenuRadioItem value="private" className="flex gap-3">
                    <User />
                    <span>Privado</span>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
