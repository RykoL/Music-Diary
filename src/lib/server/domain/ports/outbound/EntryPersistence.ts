import type { Entry, EntryId } from '$lib/server/domain/models/Entry';
import type { DiaryId } from '$lib/server/domain/models/DiaryId';

export interface EntryPersistence {
	getEntryById(entryId: EntryId): Promise<Entry | undefined>;

	getEntriesByDiaryId(diaryId: DiaryId): Promise<Entry[]>;

	removeEntry(entryId: EntryId): Promise<void>;

	updateEntry(entry: Entry): Promise<void>;

	saveEntry(newEntry: Entry): Promise<void>;
}
