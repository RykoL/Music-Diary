export class DiaryId {
    constructor(public value: string) {
    }

    public equals(id: DiaryId): boolean {
        return id.value === this.value
    }
}