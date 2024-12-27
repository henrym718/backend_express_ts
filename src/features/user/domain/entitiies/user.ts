import { IdVO } from "../value-objects/id.vo";
import { NameVO } from "../value-objects/name.vo";
import { LastNameVO } from "../value-objects/lastName.vo";
import { EmailVO } from "../value-objects/email.vo";
import { PasswordVO } from "../value-objects/password.vo";
import { UserProperties } from "./UserProperties";
import { unknown } from "zod";

export class User {
    private readonly id: IdVO;
    private readonly name: NameVO;
    private readonly lastName: LastNameVO;
    private readonly email: EmailVO;
    private readonly password: PasswordVO;
    private readonly roles: string[] | unknown[];
    private readonly active: boolean;
    private readonly createdAt: Date;
    private readonly updatedAt: Date | undefined;
    private readonly deletedAt: Date | undefined;

    constructor(private readonly properties: UserProperties) {
        this.id = properties.id;
        this.name = properties.name;
        this.lastName = properties.lastName;
        this.email = properties.email;
        this.password = properties.password;
        this.roles = properties.roles || unknown;
        this.active = properties.active ?? true;
        this.createdAt = properties.createdAt ?? new Date();
        this.updatedAt = properties.updatedAt;
        this.deletedAt = properties.deletedAt;
    }

    public toJSON() {
        return {
            id: this.id.getValue(),
            name: this.name.getValue(),
            lastName: this.lastName.getValue(),
            email: this.email.getValue(),
            password: this.password.getValue(),
            roles: this.roles,
            active: this.active,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        };
    }
}
