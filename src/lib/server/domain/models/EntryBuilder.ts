import {type Entry, EntryId, Entry} from "$lib/server/domain/models/Entry";
import type {SpotifySong} from "$lib/server/domain/models/SpotifySong";


export class EntryBuilder {

    _song: SpotifySong | undefined;
    _title: string = "";
    _content: string = "";
    _date: Date = new Date()
    _image: URL = new URL("https://picsum.photos/400/200")

    public song(spotifySong: SpotifySong): EntryBuilder {
        this._song = spotifySong;
        return this;
    }

    public content(content: string): EntryBuilder {
        this._content = content
        return this
    }

    title(title: string): EntryBuilder {
        this._title = title
        return this
    }

    date(date: Date): EntryBuilder {
        this._date = date
        return this
    }

    image(imageURL: URL): EntryBuilder {
        this._image = imageURL
        return this
    }

    build(): Entry {
        if (!this._song) {
            throw new Error("Cannot construct diary entry without a Song")
        }
        return new Entry(
            new EntryId(0),
            this._title,
            this._image,
            this._content,
            this._song,
            this._date
        )
    }
}