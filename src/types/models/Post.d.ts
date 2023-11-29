import { User } from '@/types/models/User';

export type Post = {
  Id: string;
  User: User;
  Content: string;
  Images: string[];
  Visibility: string;
  CreatedAt: string;
}