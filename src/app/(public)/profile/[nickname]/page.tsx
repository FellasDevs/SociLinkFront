import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perfil',
  description: 'Perfil do usuário',
}

type Props = {
  params: { nickname: string }
}

export default function ProfilePage({ params: { nickname } }: Props) {
  return <div>My Post: {nickname}</div>
}