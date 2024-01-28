import {ValueObject} from "$lib/server/domain/models/ValueObject";
import {randomUUID} from "node:crypto";

export class PostId extends ValueObject<string> {
    constructor(value: string) {
        super(value);
    }

    public static create(): PostId {
        return new PostId(randomUUID())
    }
}