import type {Song} from "$lib/server/domain/models/Song";
import {EntryBuilder} from "$lib/server/domain/models/EntryBuilder";
import type {EntryTitle} from "$lib/server/domain/models/EntryTitle";
import type {Image} from "$lib/server/domain/models/Image";

export class EntryId {
    constructor(public value: number) {
    }
}


export class Entry {

    id: EntryId
    title: EntryTitle
    images: Array<Image>
    song: Song
    content: string
    date: Date

    constructor(id: EntryId, title: EntryTitle, images: Array<Image>, content: string, song: Song, date: Date) {
        this.id = id
        this.title = title
        this.images = images
        this.song = song
        this.content = content
        this.date = date;
    }

    public static builder(): EntryBuilder {
        return new EntryBuilder()
    }
}