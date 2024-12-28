import { UserRepository } from "@User/domain/respositories/user.repository";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UserFactory } from "@User/domain/factories/user.factory";

export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    public async execute(dto: CreateUserDto) {
        const user = UserFactory.create(dto);
        await this.userRepository.save(user);
    }
}
