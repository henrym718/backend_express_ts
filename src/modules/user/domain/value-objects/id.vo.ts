import { v4 as uuid, validate } from "uuid";

export class IdVO {
    private constructor(private readonly value: string) {}

    public static create(): IdVO {
        return new IdVO(uuid());
    }

    public static validate(value: string): IdVO {
        if (!validate(value)) {
            throw new Error("Id no valido");
        }
        return new IdVO(value);
    }

    public getValue(): string {
        return this.value;
    }
}
