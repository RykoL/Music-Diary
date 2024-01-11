import type {Actions, PageServerLoad} from './$types';
import {mapToEntryListResponse} from "$lib/server/domain/mapper/EntryMapper";
import {DiaryService} from "$lib/server/service/DiaryService";
import {DiaryRepository} from "$lib/server/infrastructure/DiaryRepository";
import {DatabaseFactory} from "$lib/server/infrastructure/DatabaseFactory";
import {EntryDraft} from "$lib/server/domain/models/inbound/EntryDraft";
import {fail, redirect} from "@sveltejs/kit";
import { DiaryId } from '$lib/server/domain/models/DiaryId';
import type {DiaryPresentation} from "$lib/models/DiaryPresentation";

export const load: PageServerLoad = async ({params}) => {
    const diaryService = new DiaryService(new DiaryRepository(await DatabaseFactory.connect()))
    const diaryId = new DiaryId(params.diaryId)
    const diary = await diaryService.getDiaryById(diaryId)

    if (!diary) {
        return fail(404)
    }

    return {
        id: diary.id.value,
        title: diary.title,
        description: diary.description,
        entries: mapToEntryListResponse(diary.entries)
    } as DiaryPresentation;
};

export const actions = {
    default: async (event) => {
        const db = await DatabaseFactory.connect()
        const diaryService = new DiaryService(new DiaryRepository(db))
        const diaryId = new DiaryId(event.params.diaryId)
        const newEntry = EntryDraft.fromForm(await event.request.formData())
        if (newEntry) {
            await diaryService.addEntryToDiary(diaryId, newEntry)
        } else {
            console.error("Validation of form data failed")
            return fail(400)
        }

        throw redirect(303, `/diary/${diaryId.value}`)
    },
} satisfies Actions;