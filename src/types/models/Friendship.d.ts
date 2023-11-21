import {User} from "@/types/models/User";

export type Friendship = {
    Id: string;
    Accepted: boolean;
    Friend: User;
    CreatedAt: string;
}