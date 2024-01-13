import {SpotifyURL} from "$lib/server/domain/models/SpotifySong";
import type {EntryId} from "$lib/server/domain/models/Entry";
import {EntryTitle} from "$lib/server/domain/models/EntryTitle";

export class UpdateEntryRequest {
    constructor(
        public id: EntryId,
        public title: EntryTitle,
        public content: string,
        public song: SpotifyURL,
        public date: Date,
    ) {}

    public static fromForm(entryId: EntryId, data: FormData): UpdateEntryRequest | undefined {
        const title = new EntryTitle(data.get('title') as string)
        const content: string = data.get('content') as string
        const song: string = data.get('song') as string
        const rawDate: string = data.get('date') as string
        if (title && content && song && rawDate) {
            return new UpdateEntryRequest(
                entryId,
                title,
                content,
                new SpotifyURL(song),
                new Date(rawDate)
            )
        }

        return undefined
    }

}