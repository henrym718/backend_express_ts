import { User, UserProperties } from "./user";
import { Id } from "../../../core/domain/value-objects/id";
import { Name } from "./value_objects/name";
import { LastName } from "./value_objects/lastName";
import { Email } from "../../../core/domain/value-objects/email";
import { Password } from "./value_objects/password";
import { Roles, Role } from "./value_objects/roles";
import { v4 as uuidv4 } from "uuid";

export class UserFactory {
  public static create(
    id: string,
    name: string,
    lasName: string,
    email: string,
    password: string,
    roles: Array<Role>
  ): User {
    const userProperties: UserProperties = {
      id: Id.create(id),
      email: Email.create(email),
      password: Password.create(password),
      name: Name.create(name),
      lastName: LastName.create(lasName),
      roles: Roles.create(roles),
    };

    return new User(userProperties);
  }
}

const user = UserFactory.create(
  uuidv4(),
  "Henry",
  "Mosquera",
  "henrym.718@gmail.com",
  "123435s6",
  [Role.ADMIN, Role.SELLER]
);

console.log(user.properties);

const updatename = Name.create("Henry Mosquera");
user.update(updatename);
console.log(user.properties);

user.delete();
console.log(user.properties);

///
interface Repository {
  save(value: string): Promise<string>;
}

class Application {
  repository: Repository;
  constructor(repository: Repository) {
    this.repository = repository;
  }

  async save(value: string): Promise<string> {
    return await this.repository.save(value);
  }
}

class Infreateructure implements Repository {
  async save(value: string): Promise<string> {
    return await Promise.resolve(value);
  }
}

(async () => {
  const infra: Repository = new Infreateructure();
  const app = new Application(infra);
  const result = await app.save("henry");
  console.log(result);
})();
