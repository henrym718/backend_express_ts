import { validate } from "uuid";

export class Id {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  private static ensureIsValidId(value: string): void {
    if (!validate(value)) {
      throw Error("Id not valid");
    }
  }

  public static create(value: string): Id {
    this.ensureIsValidId(value);
    return new Id(value);
  }

  public getValue(): string {
    return this.value;
  }
}
