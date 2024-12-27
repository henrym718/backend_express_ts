import { User } from "../entitiies/user";
import { EmailVO } from "../value-objects/email.vo";
import { PasswordVO } from "../value-objects/password.vo";
import { IdVO } from "../value-objects/id.vo";
import { NameVO } from "../value-objects/name.vo";
import { LastNameVO } from "../value-objects/lastName.vo";
import { UserProperties } from "../entitiies/UserProperties";

interface UserResponseDTO {
    name: string;
    lastName: string;
    email: string;
    password: string;
    roles: string[];
}

interface UserDBDTO {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    roles: unknown[];
    active: boolean;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export class UserFactory {
    public static create(props: UserResponseDTO): User {
        const userProperties: UserProperties = {
            id: IdVO.create(),
            email: EmailVO.create(props.email),
            password: PasswordVO.create(props.password),
            name: NameVO.create(props.name),
            lastName: LastNameVO.create(props.lastName),
            roles: props.roles,
        };

        return new User(userProperties);
    }

    public static reconstitute(props: UserDBDTO): User {
        const userProperties: UserProperties = {
            id: IdVO.create(),
            name: NameVO.create(props.name),
            lastName: LastNameVO.create(props.lastName),
            email: EmailVO.create(props.email),
            password: PasswordVO.create(props.password),
            roles: ["admin"],
            active: props.active,
            createdAt: props.createdAt,
            updatedAt: props.updatedAt,
            deletedAt: props.updatedAt,
        };

        return new User(userProperties);
    }
}
