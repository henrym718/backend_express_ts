export class PasswordVO {
    private constructor(private readonly value: string) {}

    public static create(value: string): PasswordVO {
        this.isValidPassword(value);
        return new PasswordVO(value);
    }

    private static isValidPassword(value: string): void {
        if (!new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{5,}$/).test(value)) {
            throw new Error("Invalid password from VO");
        }
    }

    public getValue(): string {
        return this.value;
    }

    public equals(other: PasswordVO): boolean {
        return this.value === other.value;
    }
}
