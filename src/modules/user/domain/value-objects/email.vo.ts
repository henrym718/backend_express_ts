export class EmailVO {
    private constructor(private readonly value: string) {
        this.validate(value);
    }

    private validate(value: string): void {
        if (!value) {
            throw new Error("Email is required");
        }

        if (!new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(value)) {
            throw new Error("Invalid email");
        }
    }

    public static create(value: string): EmailVO {
        return new EmailVO(value);
    }

    public getValue(): string {
        return this.value;
    }
}
