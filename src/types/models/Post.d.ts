import { User } from '@/types/models/User';

export type Post = {
  Id: string;
  OriginalPost?: Post;
  User: User;
  Content: string;
  Images: string[];
  Visibility: string;
  Likes: number;
  Liked: boolean;
  CreatedAt: string;
}