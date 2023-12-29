import type {Song} from "$lib/server/domain/models/Song";
import type {DiaryLocation} from "$lib/server/domain/models/DiaryLocation";
import {EntryBuilder} from "$lib/server/domain/models/EntryBuilder";

export class EntryId {
    constructor(public value: number) {
    }
}


export class Entry {

    id: EntryId
    title: string
    imageURL: URL
    song: Song
    content: string
    date: Date

    constructor(id: EntryId, title: string, image: URL, content: string, song: Song, date: Date) {
        this.id = id
        this.title = title
        this.imageURL = image
        this.song = song
        this.content = content
        this.date = date;
    }

    public static builder(): EntryBuilder {
        return new EntryBuilder()
    }
}

export class EntryWithLocation extends Entry {

    constructor(
        public id: EntryId,
        public title: string,
        public imageURL: URL,
        public content: string,
        public song: Song,
        public date: Date,
        public location: DiaryLocation
    ) {
        super(id, title, imageURL, content, song, date)
    }

}