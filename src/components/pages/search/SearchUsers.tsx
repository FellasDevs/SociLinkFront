'use client'

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const SearchUsers = () => {
  return (
    <div>
      <Label className='text-xl'>Pesquisar</Label>
      <Input className='grow'/>
    </div>
  )
}