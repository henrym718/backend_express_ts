import { Id } from "@/core/domain/value-objects/id";
import { Name } from "./value_objects/name";
import { LastName } from "./value_objects/lastName";
import { Email } from "@/core/domain/value-objects/email";
import { Password } from "./value_objects/password";
import { Roles } from "./value_objects/roles";

interface UserRequired {
  id: Id;
  name: Name;
  lastName: LastName;
  email: Email;
  password: Password;
  roles: Roles;
}
interface UserOptions {
  active: boolean;
  updatedAt: Date | undefined;
  deletedAt: Date | undefined;
}

export type UserProperties = UserRequired & Partial<UserOptions>;

export class User {
  private readonly id: Id;
  private name: Name;
  private lastName: LastName;
  private readonly email: Email;
  private password: Password;
  private roles: Roles;
  private active: boolean;
  private readonly createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(properties: UserProperties) {
    this.id = properties.id;
    this.name = properties.name;
    this.lastName = properties.lastName;
    this.email = properties.email;
    this.password = properties.password;
    this.roles = properties.roles;
    this.active = true;
    this.createdAt = new Date();
    this.updatedAt = properties.updatedAt;
    this.deletedAt = properties.deletedAt;
  }

  public get properties() {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      lasName: this.lastName.getValue(),
      email: this.email.getValue(),
      password: this.password.getValue(),
      roles: this.roles.getValue(),
      active: this.active,
      createdAt: this.createdAt,
      ...(this.updatedAt && { updateAt: this.updatedAt }),
      ...(this.deletedAt && { deleteAt: this.deletedAt }),
    };
  }

  public update(name?: Name, lastName?: LastName, password?: Password) {
    let hasChanges = false;
    if (name && !name.equals(this.name)) {
      this.name = name;
      hasChanges = true;
    }
    if (lastName && !lastName.equals(this.lastName)) {
      this.lastName = lastName;
      hasChanges = true;
    }
    if (password && !password.equals(this.password)) {
      this.password = password;
      hasChanges = true;
    }
    if (hasChanges) {
      this.updatedAt = new Date();
    }
  }

  public delete() {
    this.active = false;
    this.deletedAt = new Date();
  }
}
