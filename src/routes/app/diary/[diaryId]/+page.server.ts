import type { Actions, PageServerLoad } from './$types';
import { mapToEntryListResponse } from '$lib/server/domain/mapper/EntryMapper';
import { DiaryService } from '$lib/server/service/DiaryService';
import { DiaryRepository } from '$lib/server/infrastructure/DiaryRepository';
import { DatabaseFactory } from '$lib/server/infrastructure/DatabaseFactory';
import { EntryDraft } from '$lib/server/domain/inbound/EntryDraft';
import { fail, redirect } from '@sveltejs/kit';
import { DiaryId } from '$lib/server/domain/models/DiaryId';

export const load: PageServerLoad = async ({ params }) => {
	const diaryService = new DiaryService(new DiaryRepository(await DatabaseFactory.connect()));
	const diaryId = new DiaryId(params.diaryId);
	const entries = await diaryService.listDiaryEntries(diaryId);

	return {
		id: diaryId.value,
		entries: mapToEntryListResponse(entries)
	};
};

export const actions = {
	default: async (event) => {
		const db = await DatabaseFactory.connect();
		const diaryService = new DiaryService(new DiaryRepository(db));
		const diaryId = new DiaryId(event.params.diaryId);
		const newEntry = EntryDraft.fromForm(await event.request.formData());
		if (newEntry) {
			await diaryService.addEntryToDiary(diaryId, newEntry);
		} else {
			console.error('Validation of form data failed');
			return fail(400);
		}

		throw redirect(303, `/app/diary/${diaryId.value}`);
	}
} satisfies Actions;
