import { User } from "../domain/user";
import { Id } from "@/core/domain/value-objects/id";
import { UserRepository } from "../domain/user-repository/user_repository";

export class UserApplication {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async find(id: Id): Promise<User | null> {
    return await this.repository.find(id);
  }

  async findAll(): Promise<Array<User>> {
    return await this.repository.findAll();
  }
}
