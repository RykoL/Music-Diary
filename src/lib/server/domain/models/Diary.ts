import type {Entry} from "$lib/domain/models/Entry";

export class DiaryId {
    constructor(public value: number) {}
}

export class Diary {
    public id: DiaryId
    public entries: Array<Entry> = []

    constructor(id: DiaryId, entries: Array<Entry>) {
        this.id = id
        this.entries = entries
    }

}