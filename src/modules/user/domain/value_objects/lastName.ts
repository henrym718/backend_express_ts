export class LastName {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  private static ensureValueIsDefined(value: string): void {
    if (!value.trim()) {
      throw Error("value must be defined");
    }
  }

  public static create(value: string): LastName {
    this.ensureValueIsDefined(value);
    return new LastName(value);
  }

  public getValue() {
    return this.value;
  }
  public equals(other: LastName): boolean {
    return this.value === other.getValue();
  }
}
