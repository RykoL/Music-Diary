import {SpotifyURL} from "$lib/server/domain/models/SpotifySong";

export class AddNewEntryRequest {
    constructor(
        public title: string,
        public content: string,
        public song: SpotifyURL,
        public date: Date,
        public images: File[]
    ) {}

    public static fromForm(data: FormData): AddNewEntryRequest | undefined {
        const title: string = data.get('title') as string
        const content: string = data.get('content') as string
        const song: string = data.get('song') as string
        const rawDate: string = data.get('date') as string
        const images = (data.getAll("images") as File[]).filter(img => img.size > 0)

        images.forEach(img => {
            if (!img.type.includes("image/")) {
               throw new Error(`Uploaded file ${img.name} is not a valid image.`)
            }
        })

        if (title && content && song && rawDate) {
            return new AddNewEntryRequest(
                title,
                content,
                new SpotifyURL(song),
                new Date(rawDate),
                images
            )
        }

        return undefined
    }

}