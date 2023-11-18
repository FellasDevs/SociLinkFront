import { User } from '@/types/entities/User';

export type Post = {
  Id: string;
  User: User;
  Content: string;
  Images: string[];
  Visibility: string;
}