import type {Entry} from "$lib/server/domain/models/Entry";

export class DiaryId {
    constructor(public value: string) {}
}

export class Diary {
    public id: DiaryId
    private entries: Array<Entry> = []

    constructor(id: DiaryId, entries: Array<Entry>) {
        this.id = id
        this.entries = entries
    }

    public addEntry(entry: Entry): void {
       this.entries.push(entry)
    }
}