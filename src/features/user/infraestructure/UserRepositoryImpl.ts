import { DataBaseBootstrap } from "@Bootstrap/database.bootstrap";
import { User } from "@User/domain/entitiies/user";
import { UserRepository } from "@User/domain/respositories/user.repository";
import { UserEntity } from "./user.entity";
import { UserMapper } from "./mappers/user.mapper";

export class UserRepositoryImpl implements UserRepository {
    async save(user: User): Promise<void> {
        const repository = DataBaseBootstrap.getDatasource.getRepository(UserEntity);
        const userEntity = UserMapper.domainToEntity(user);
        await repository.save(userEntity);
    }

    async find(id: string): Promise<User | null> {
        const repository = DataBaseBootstrap.getDatasource.getRepository(UserEntity);
        const userEntity = await repository.findOne({ where: { id, active: true } });
        if (!userEntity) return null;
        return UserMapper.entityToDomain(userEntity);
    }
    async findAll(): Promise<User[] | null> {
        const repository = DataBaseBootstrap.getDatasource.getRepository(UserEntity);
        const usersEntity = await repository.find({ where: { active: true } });
        if (!usersEntity.length) return null;
        return usersEntity.map((user) => UserMapper.entityToDomain(user));
    }
}
