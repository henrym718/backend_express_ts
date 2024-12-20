export class Email {
  private readonly value: string;
  private static readonly validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private constructor(value: string) {
    this.value = value;
  }
  private static ensureIsValidEmail(value: string): void {
    if (!this.validEmailRegex.test(value)) {
      throw new Error(`${value} is not a valid`);
    }
  }

  public static create(value: string): Email {
    this.ensureIsValidEmail(value);
    return new Email(value);
  }

  public getValue(): string {
    return this.value;
  }
}
