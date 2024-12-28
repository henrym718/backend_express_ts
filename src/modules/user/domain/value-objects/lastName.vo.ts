export class LastNameVO {
    constructor(private readonly value: string) {}

    public static create(value: string): LastNameVO {
        this.ensureIsValid(value);
        return new LastNameVO(value);
    }

    private static ensureIsValid(value: string) {
        if (!value.trim()) {
            throw new Error("LastName invalid");
        }
    }

    public getValue() {
        return this.value;
    }
}
