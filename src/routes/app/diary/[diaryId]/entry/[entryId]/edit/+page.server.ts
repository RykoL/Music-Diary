import type { Actions, PageServerLoad } from './$types';
import { DiaryService } from '$lib/server/service/DiaryService';
import { DiaryRepository } from '$lib/server/infrastructure/DiaryRepository';
import { DatabaseFactory } from '$lib/server/infrastructure/DatabaseFactory';
import { entryToPresentation } from '$lib/server/domain/mapper/EntryMapper';
import { EntryId } from '$lib/server/domain/models/diary/Entry';
import { error, fail, redirect } from '@sveltejs/kit';
import { UpdateEntryRequest } from '$lib/server/domain/inbound/UpdateEntry';
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
	edit: async (event) => {
		const diaryService = new DiaryService(new DiaryRepository(await DatabaseFactory.connect()));
		const entryId = new EntryId(parseInt(event.params.entryId));
		const updateEntry = UpdateEntryRequest.fromForm(entryId, await event.request.formData());

		if (!updateEntry) {
			return fail(400);
		}

		await diaryService.editEntry(updateEntry);

		redirect(303, '/diary');
	},
	'attach-image': async (event) => {
		const diaryService = new DiaryService(new DiaryRepository(await DatabaseFactory.connect()));
		const data = await event.request.formData();
		const imgFile = data.get('image') as File;
		const entryId = new EntryId(parseInt(event.params.entryId));

		if (imgFile) {
			await diaryService.attachImageToEntry(entryId, imgFile);
		}

		return { success: true };
	}
} satisfies Actions;
