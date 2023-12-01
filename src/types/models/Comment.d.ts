import {User} from "@/types/models/User";

export type Comment = {
    Id: string;
    Content: string;
    User: User;
    CreatedAt: string;
}