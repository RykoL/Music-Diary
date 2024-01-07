import {Diary} from "$lib/server/domain/models/Diary";
import { DiaryId } from "../domain/models/DiaryId";
import {type EntryRecord, mapEntries} from "$lib/server/entity/EntryMapper";

export type DiaryRecord = {
    diaryId: string,
    diaryTitle: string
    diaryDescription: string
} & EntryRecord

export const DiaryMapper = (records: DiaryRecord[]): Diary => {
    const firstRecord = records[0]
    const entries = mapEntries(records)
    return new Diary(
        new DiaryId(firstRecord.diaryId),
        firstRecord.diaryTitle,
        firstRecord.diaryDescription,
        entries
    )
}