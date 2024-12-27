import { v4 as uuid } from "uuid";

export class IdVO {
    private constructor(private readonly value: string) {}

    public static create(): IdVO {
        return new IdVO(uuid());
    }

    public getValue(): string {
        return this.value;
    }
}
