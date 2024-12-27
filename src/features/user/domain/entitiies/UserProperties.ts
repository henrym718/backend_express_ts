import { EmailVO } from "../value-objects/email.vo";
import { IdVO } from "../value-objects/id.vo";
import { LastNameVO } from "../value-objects/lastName.vo";
import { NameVO } from "../value-objects/name.vo";
import { PasswordVO } from "../value-objects/password.vo";

interface UserRequired {
    readonly id: IdVO;
    readonly name: NameVO;
    readonly lastName: LastNameVO;
    readonly email: EmailVO;
    readonly password: PasswordVO;
    readonly roles: string[] | unknown[];
}

interface UserOptional {
    readonly active: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date | undefined;
    readonly deletedAt: Date | undefined;
}

export type UserProperties = UserRequired & Partial<UserOptional>;
