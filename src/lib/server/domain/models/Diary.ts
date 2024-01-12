import {Entry, type EntryId} from "$lib/server/domain/models/Entry";
import type {DiaryId} from "$lib/server/domain/models/DiaryId";
import type {EntryDraft} from "$lib/server/domain/models/inbound/EntryDraft";

export class Diary {

    public id: DiaryId;
    public title: string;
    public description: string;
    private _entries: Array<Entry> = []

    constructor(id: DiaryId, title:string, description: string, entries: Array<Entry>) {
        this.id = id
        this.title = title;
        this.description = description;
        this._entries = entries
    }

    public writeEntry(draft: EntryDraft): Entry {
        const entry =  Entry
            .builder()
            .withDiaryId(this.id.value)
            .title(draft.title)
            .content(draft.content)
            .date(draft.date)
            .build();

        entry.attachImages(...draft.images)
        entry.linkSong(draft.song)

        this._entries.push(entry)

        return entry
    }

    public getEntry(id: EntryId): Entry | undefined {
        return this._entries.find(e => e.id.equals(id))
    }

    get entries() {
        return this._entries
    }
}