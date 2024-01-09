import type {Entry, EntryId} from "$lib/server/domain/models/Entry";
import type {DiaryId} from "$lib/server/domain/models/DiaryId";

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

    public addEntry(entry: Entry): void {
       this._entries.push(entry)
    }

    public getEntry(id: EntryId): Entry | undefined {
        return this._entries.find(e => e.id.equals(id))
    }

    public getNewEntries(): Array<Entry> {
        throw new Error("oy you missed an implementation here");
        return this._entries
    }

    get entries() {
        return this._entries
    }
}