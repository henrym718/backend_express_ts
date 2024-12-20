import { Id } from "@/core/domain/value-objects/id";
import { User } from "../user";

export interface UserRepository {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  find(id: Id): Promise<User> | null;
  findAll(): Promise<Array<User>>;
}
