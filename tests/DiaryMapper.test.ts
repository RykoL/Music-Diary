import { diaryMapper, type DiaryRecord } from '$lib/server/mapper/DiaryMapper';
import { Diary } from '$lib/server/domain/models/diary/Diary';
import { DiaryId } from '$lib/server/domain/models/diary/DiaryId';
import { aFirstEntry, aSecondEntry, baseRecord } from './fixtures';
import { UserId } from '$lib/server/domain/models/UserId';

test('maps diary id from record', () => {
	const record: DiaryRecord = {
		...baseRecord,
		diaryId: 'abc'
	};

	const expected = new Diary(new DiaryId('abc'), '', '', [], new UserId("abc"));
	const actual = diaryMapper([record]);
	expect(expected.id).toEqual(actual.id);
});

test('maps diary title from record', () => {
	const record: DiaryRecord = {
		...baseRecord,
		diaryTitle: 'Some title'
	};

	const expected = new Diary(new DiaryId('abc'), 'Some title', '', [], new UserId("abc"));
	const actual = diaryMapper([record]);
	expect(expected.title).toEqual(actual.title);
});

test('maps diary description from record', () => {
	const record: DiaryRecord = {
		...baseRecord,
		diaryDescription: 'Some description'
	};

	const expected = new Diary(new DiaryId('abc'), 'Some title', 'Some description', [], new UserId("abc"));
	const actual = diaryMapper([record]);
	expect(expected.description).toEqual(actual.description);
});

test('maps entry from record', () => {
	const diary = new Diary(
		new DiaryId(baseRecord.diaryId),
		baseRecord.diaryTitle,
		baseRecord.diaryDescription,
		[aFirstEntry],
		new UserId("abc")
	);

	const actual = diaryMapper([baseRecord]);
	expect(diary.entries).toStrictEqual(actual.entries);
});

test('maps multiple entries from record without duplicates', () => {
	const expected = new Diary(
		new DiaryId(baseRecord.diaryId),
		baseRecord.diaryTitle,
		baseRecord.diaryDescription,
		[aFirstEntry, aSecondEntry],
		new UserId("abc")
	);

	const records: Array<DiaryRecord> = [
		baseRecord,
		{ ...baseRecord, entryId: 1, entryTitle: 'Second' }
	];

	const actual = diaryMapper(records);
	expect(actual.entries.length).toEqual(2);
	expect(expected.entries).toStrictEqual(actual.entries);
});

test('construct diary with empty entries if entryId is null', () => {
	const record: DiaryRecord = {
		diaryId: '58f7daa7-6b1e-4400-b94a-5f44f1d810f7',
		diaryTitle: 'My music diary',
		diaryDescription: 'This is your first diary.',
		content: '',
		date: '',
		embed: '',
		entryId: null,
		imageId: '',
		songId: '',
		entryTitle: '',
		url: ''
	};

	const records: Array<DiaryRecord> = [record];

	const actual = diaryMapper(records);
	expect(actual.entries.length).toEqual(0);
});
