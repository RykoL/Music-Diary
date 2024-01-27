import type { Actions } from '@sveltejs/kit';
import { DiaryService } from '$lib/server/service/DiaryService';
import { DiaryRepository } from '$lib/server/infrastructure/DiaryRepository';
import { DatabaseFactory } from '$lib/server/infrastructure/DatabaseFactory';
import type { Diary } from '$lib/server/domain/models/diary/Diary';
import { toPresentation } from '$lib/server/domain/mapper/DiaryMapper';
import { NewDiary } from '$lib/server/domain/inbound/NewDiary';
import { DiaryId } from '$lib/server/domain/models/diary/DiaryId';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (params) => {
	const user = params.locals.appUser;
	const diaryService = new DiaryService(new DiaryRepository(await DatabaseFactory.connect()));
	const diaries: Array<Diary> = await diaryService.listDiaries(user);
	return {
		diaries: diaries.map(toPresentation)
	};
};

export const actions = {
	startDiary: async ({ request, locals }) => {
		const user = locals.appUser;
		const diaryService = new DiaryService(new DiaryRepository(await DatabaseFactory.connect()));
		const newDiary = new NewDiary(await request.formData());
		await diaryService.startNewDiary(user, newDiary);
	},
	delete: async ({ request }) => {
		const diaryService = new DiaryService(new DiaryRepository(await DatabaseFactory.connect()));
		const diaryId = new DiaryId((await request.formData()).get('diaryId') as string);

		await diaryService.deleteDiary(diaryId);
	}
} as Actions;
