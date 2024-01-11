export class ImageId {

    public value: string;

    constructor(value?: string) {
        if (value) {
            this.value = value
        } else {
            this.value = global.crypto.randomUUID()
        }
    }
}

export type Image = AttachedImage | UnattachedImage

export class AttachedImage {
    constructor(
        public id: ImageId,
        public publicURL: URL
    ) {
    }
}

export class UnattachedImage {
    constructor(public id: ImageId,
                public file: File) {}
}