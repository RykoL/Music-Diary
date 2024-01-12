import {randomUUID} from "node:crypto";

export class DiaryId {

    value: string
    constructor(value?: string) {
        if (!value) {
            this.value = randomUUID()
        } else {
            this.value = value
        }
    }

    public equals(id: DiaryId): boolean {
        return id.value === this.value
    }
}