import '../../styles/globals.css';
import { ReactNode } from 'react';

type Props = { children: ReactNode }

export default async function PublicLayout({ children }: Props) {
  return <>{children}</>;
}