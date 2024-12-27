import { User } from "../domain/entitiies/user";
import { UserRepository } from "../domain/respositories/user.repository";

export class UserApplication {
    constructor(private readonly userRepository: UserRepository) {}

    async save(user: User): Promise<void> {
        await this.userRepository.save(user);
    }

    async find(id: string): Promise<User | null> {
        return await this.userRepository.find(id);
    }

    async findAll(): Promise<Array<User> | null> {
        return await this.userRepository.findAll();
    }
}
