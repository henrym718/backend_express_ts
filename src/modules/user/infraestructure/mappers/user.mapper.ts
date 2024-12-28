import { User } from "@User/domain/entitiies/user";
import { UserEntity } from "../entities/user.entity";
import { RolesEntity } from "@Role/infraestructure/roles.entity";
import { UserFactory } from "@User/domain/factories/user.factory";

export class UserMapper {
    static domainToEntity(user: User): UserEntity {
        const userJSON = user.toJSON();
        const userEntity = new UserEntity();
        userEntity.id = userJSON.id;
        userEntity.name = userJSON.name;
        userEntity.lastName = userJSON.lastName;
        userEntity.email = userJSON.email;
        userEntity.password = userJSON.password;
        userEntity.roles = userJSON.roles as RolesEntity[];
        userEntity.active = userJSON.active ?? true;
        userEntity.createdAt = userJSON.createdAt ?? new Date();
        userEntity.updatedAt = userJSON.updatedAt ?? new Date();
        userEntity.deletedAt = userJSON.deletedAt;

        return userEntity;
    }

    static entityToDomain(userEntity: UserEntity): User {
        return UserFactory.reconstitute({
            id: userEntity.id,
            name: userEntity.name,
            lastName: userEntity.lastName,
            email: userEntity.email,
            password: userEntity.password,
            roles: userEntity.roles,
            active: userEntity.active,
            createdAt: userEntity.createdAt,
            updatedAt: userEntity.updatedAt,
            deletedAt: userEntity.deletedAt,
        });
    }
}
