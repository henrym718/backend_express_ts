export enum Role {
  USER = "USER",
  SELLER = "SELLER",
  ADMIN = "ADMIN",
}

export class Roles {
  private readonly value: Array<Role>;

  constructor(value: Array<Role>) {
    this.value = value;
  }

  public static create(value: Array<Role>): Roles {
    return new Roles(value);
  }

  public getValue(): Array<Role> {
    return this.value;
  }

  public equals(other: Roles): boolean {
    return (
      this.value.length === other.getValue().length &&
      this.value.every((role, index) => role === other.getValue()[index])
    );
  }
}
