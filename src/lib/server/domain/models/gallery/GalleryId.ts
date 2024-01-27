import {ValueObject} from "$lib/server/domain/models/ValueObject";
import {randomUUID} from "node:crypto";

export class GalleryId extends ValueObject<string> {
    constructor(value: string) {
        super(value);

    }

    public static create(): GalleryId {
        return new GalleryId(randomUUID())
    }
}