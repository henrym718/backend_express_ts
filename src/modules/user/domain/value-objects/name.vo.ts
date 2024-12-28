export class NameVO {
    private constructor(private readonly name: string) {}

    public static create(value: string): NameVO {
        this.ensureIsValid(value);

        return new NameVO(value);
    }

    private static ensureIsValid(value: string) {
        if (!value.trim()) {
            throw new Error("Name must not be empty");
        }
    }

    public getValue() {
        return this.name;
    }
}
