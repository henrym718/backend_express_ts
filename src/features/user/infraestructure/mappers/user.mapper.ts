import { User } from "@User/domain/entitiies/user";
import { UserEntity } from "../user.entity";
import { RolesEntity } from "@Role/infraestructure/roles.entity";
import { UserFactory } from "@User/domain/factories/user.factory";

export class UserMapper {
    static domainToEntity(user: User): UserEntity {
        const userJson = user.toJSON();
        const entity = new UserEntity();

        entity.id = userJson.id;
        entity.name = userJson.name;
        entity.lastName = userJson.lastName;
        entity.email = userJson.email;
        entity.password = userJson.password;
        entity.roles = userJson.roles as RolesEntity[];
        entity.active = userJson.active;
        entity.createdAt = userJson.createdAt;
        entity.updatedAt = userJson.updatedAt ?? new Date();
        entity.deletedAt = userJson.deletedAt;

        return entity;
    }

    static entityToDomain(userEntity: UserEntity): User {
        return UserFactory.reconstitute(userEntity);
    }
}
