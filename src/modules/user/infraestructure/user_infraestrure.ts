import { Id } from "@/core/domain/value-objects/id";
import { User } from "../domain/user";
import { UserRepository } from "../domain/user-repository/user_repository";

export class UserInfraestructure implements UserRepository {
  save(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: Id): Promise<User> | null {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Array<User>> {
    throw new Error("Method not implemented.");
  }
}
