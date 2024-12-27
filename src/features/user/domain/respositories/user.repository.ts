import { User } from "../entitiies/user";

export interface UserRepository {
    save(user: User): Promise<void>;
    find(id: string): Promise<User | null>;
    findAll(): Promise<User[] | null>;
}
