import type {Actions, PageServerLoad} from "@sveltejs/kit";
import {DiaryService} from "$lib/server/service/DiaryService";
import {DiaryRepository} from "$lib/server/infrastructure/DiaryRepository";
import {DatabaseFactory} from "$lib/server/infrastructure/DatabaseFactory";
import type {Diary} from "$lib/server/domain/models/Diary";
import {toPresentation} from "$lib/server/domain/mapper/DiaryMapper";
import {NewDiary} from "$lib/server/domain/models/inbound/NewDiary";

export const load: PageServerLoad = async () => {
    const diaryService = new DiaryService(new DiaryRepository(await DatabaseFactory.connect()))
    const diaries: Array<Diary> = await diaryService.listDiaries()
    return {
        diaries: diaries.map(toPresentation)
    }
}

export const actions = {
    default: async ({request}) => {
        const diaryService = new DiaryService(new DiaryRepository(await DatabaseFactory.connect()))
        const newDiary = new NewDiary(await request.formData())
        await diaryService.startNewDiary(newDiary)
    }
} as Actions