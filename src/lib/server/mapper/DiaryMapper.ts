import { Diary } from '$lib/server/domain/models/diary/Diary';
import { DiaryId } from '../domain/models/diary/DiaryId';
import { type EntryRecord, mapEntries } from '$lib/server/mapper/EntryMapper';
import { UserId } from '../domain/models/UserId';

export type DiaryRecord = {
	diaryId: string;
	diaryTitle: string;
	diaryDescription: string;
} & EntryRecord;

export const mapDiaries = (records: DiaryRecord[]): Diary[] => {
	const entityMap = new Map<string, DiaryRecord[]>();
	records.forEach((row) => {
		if (row.diaryId) {
			entityMap.set(row.diaryId, [...(entityMap.get(row.diaryId) ?? []), row]);
		}
	});
	return Array.from(entityMap.values()).map(diaryMapper);
};

export const diaryMapper = (records: DiaryRecord[]): Diary => {
	const firstRecord = records[0];
	const entries = mapEntries(records);
	return new Diary(
		new DiaryId(firstRecord.diaryId),
		firstRecord.diaryTitle,
		firstRecord.diaryDescription,
		entries,
		new UserId("")
	);
};
