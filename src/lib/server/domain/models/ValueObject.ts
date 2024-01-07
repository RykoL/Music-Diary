
export class ValueObject<T extends NonNullable<unknown>> {
    constructor(public value: T) {}

    public toString(): string {
        return this.value.toString()
    }
}