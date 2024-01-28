import {ValueObject} from "$lib/server/domain/models/ValueObject";

export class GalleryTitle extends ValueObject<string> {
    constructor(title: string) {
        if (title.length > 30) {
            throw new Error("The title of a gallery cannot exceed 30 characters.")
        }
        super(title);
    }
}