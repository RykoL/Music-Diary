import {Entry} from "$lib/server/domain/models/Entry";
import {SpotifyId, SpotifySong, SpotifyURL} from "$lib/server/domain/models/SpotifySong";

export type EntryRow = {
    entryId: number,
    title: string,
    content: string,
    date: string
    songId: string
    url: string
    embed: string
}

export class EntryEntity {

    constructor(
        public id: number,
        public title: string,
        public content: string,
        public embed: string,
        public date: string,
        public songId: string,
        public url: string
    ) {
    }

    public static fromRow(row: EntryRow): EntryEntity {
        return new EntryEntity(row['entryId'], row['title'], row['content'], row['embed'], row['date'], row['songId'], row['url'])
    }

    public toEntry(): Entry {
        return Entry.builder()
            .withId(this.id)
            .title(this.title)
            .withImages("https://picsum.photos/400/200")
            .content(this.content)
            .song(new SpotifySong(
                new SpotifyId(this.songId),
                new SpotifyURL(this.url),
                this.embed
            ))
            .date(new Date(this.date))
            .build();
    }
}