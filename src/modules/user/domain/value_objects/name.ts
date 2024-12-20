export class Name {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  private static ensureValueIsDefined(value: string): void {
    if (!value.trim()) {
      throw Error("Value must be defined");
    }
  }

  public static create(value: string): Name {
    this.ensureValueIsDefined(value);
    return new Name(value);
  }

  public getValue() {
    return this.value;
  }

  public equals(other: Name): boolean {
    return this.value === other.getValue();
  }
}
