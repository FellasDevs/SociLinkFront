import {User} from "@/types/models/User";

export type Friendship = {
    Id: string;
    Friend: User;
    CreatedAt: string;
}