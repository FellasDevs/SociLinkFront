import * as React from 'react';

import { Loader2 } from 'lucide-react';

type Props = {
  size?: number | string;
}

export const Loader = ({ size }: Props) => {
  return <Loader2 size={size} className="mr-2 animate-spin" />
}

export const LoaderWithText = ({ size }: Props) => {
  return (
    <div className='flex items-center gap-1'>
      <Loader2 size={size} className="mr-2 animate-spin" />
      Carregando...
    </div>
  )
}