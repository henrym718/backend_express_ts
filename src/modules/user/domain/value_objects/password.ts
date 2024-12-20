export class Password {
  private readonly value: string;
  private static readonly passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{5,}$/;

  private constructor(value: string) {
    this.value = value;
  }

  private static ensureIsValidPassword(value: string): void {
    if (!this.passwordRegex.test(value)) {
      throw new Error(`${value} is not a valid`);
    }
  }
  public static create(value: string): Password {
    this.ensureIsValidPassword(value);
    return new Password(value);
  }

  public getValue() {
    return this.value;
  }

  public equals(other: Password): boolean {
    return this.value === other.getValue();
  }
}
