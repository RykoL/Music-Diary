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

export class Image {
    constructor(
        public id: ImageId,
        public publicURL: URL
    ) {
    }
}