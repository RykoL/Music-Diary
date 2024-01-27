import type { Actions, PageServerLoad } from './$types';
import { DiaryService } from '$lib/server/service/DiaryService';
import { DiaryRepository } from '$lib/server/infrastructure/DiaryRepository';
import { DatabaseFactory } from '$lib/server/infrastructure/DatabaseFactory';
import { entryToPresentation } from '$lib/server/domain/mapper/EntryMapper';
import { EntryId } from '$lib/server/domain/models/diary/Entry';
import { error } from '@sveltejs/kit';
import { DiaryId } from '$lib/server/domain/models/diary/DiaryId';

export const load: PageServerLoad = async ({ params }) => {
	const diaryService = new DiaryService(new DiaryRepository(await DatabaseFactory.connect()));
	const entryId = new EntryId(parseInt(params.entryId));
	const diaryId = new DiaryId(params.diaryId);
	const entry = await diaryService.getEntryById(diaryId, entryId);

	if (entry === undefined) {
		error(404);
	}

	return {
		diaryId: diaryId.value,
		entry: entryToPresentation(entry)
	};
};

export const actions = {
	delete: async (event) => {
		const diaryService = new DiaryService(new DiaryRepository(await DatabaseFactory.connect()));
		const entryId = new EntryId(parseInt(event.params.entryId));

		await diaryService.deleteEntry(entryId);

		return { success: true };
	}
} satisfies Actions;
