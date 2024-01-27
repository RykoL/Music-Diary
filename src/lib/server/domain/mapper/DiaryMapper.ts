import type { DiaryPresentation } from '$lib/models/DiaryPresentation';
import type { Diary } from '$lib/server/domain/models/Diary';

export const toPresentation = (diary: Diary): DiaryPresentation => {
	return {
		id: diary.id.value,
		title: diary.title,
		description: diary.description
	};
};
