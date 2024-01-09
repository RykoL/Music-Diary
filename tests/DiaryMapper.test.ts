import {DiaryMapper, type DiaryRecord} from "$lib/server/entity/DiaryMapper";
import {Diary} from "$lib/server/domain/models/Diary";
import {DiaryId} from "$lib/server/domain/models/DiaryId";
import {aFirstEntry, aSecondEntry, baseRecord} from "./fixtures";

test("maps diary id from record", () => {
    const record: DiaryRecord = {
        ...baseRecord,
        diaryId: "abc",
    }

    const expected = new Diary(
        new DiaryId("abc"),
        "",
        []
    )
    const actual = DiaryMapper([record])
    expect(expected.id).toEqual(actual.id)
})

test("maps diary title from record", () => {
    const record: DiaryRecord = {
        ...baseRecord,
        diaryTitle: "Some title",
    }

    const expected = new Diary(
        new DiaryId("abc"),
        "Some title",
        []
    )
    const actual = DiaryMapper([record])
    expect(expected.title).toEqual(actual.title)
})

test("maps diary description from record", () => {
    const record: DiaryRecord = {
        ...baseRecord,
        diaryDescription: "Some description",
    }

    const expected = new Diary(
        new DiaryId("abc"),
        "Some title",
        "Some description",
        []
    )
    const actual = DiaryMapper([record])
    expect(expected.description).toEqual(actual.description)
})

test("maps entry from record", () => {

    const diary = new Diary(
        new DiaryId(baseRecord.diaryId),
        baseRecord.diaryTitle,
        baseRecord.diaryDescription,
        [aFirstEntry]
    )

    const actual = DiaryMapper([baseRecord])
    expect(diary.entries).toStrictEqual(actual.entries)
})

test("maps multiple entries from record without duplicates", () => {

    const expected = new Diary(
        new DiaryId(baseRecord.diaryId),
        baseRecord.diaryTitle,
        baseRecord.diaryDescription,
        [aFirstEntry, aSecondEntry]
    )

    const records: Array<DiaryRecord> = [
       baseRecord,
        {...baseRecord, entryId: 1, entryTitle: 'Second'}
    ]

    const actual = DiaryMapper(records)
    expect(actual.entries.length).toEqual(2)
    expect(expected.entries).toStrictEqual(actual.entries)
})