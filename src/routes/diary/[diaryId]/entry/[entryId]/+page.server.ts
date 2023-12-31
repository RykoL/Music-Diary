import type {Actions, PageLoad} from './$types';
import {DiaryService} from "$lib/server/service/DiaryService";
import {DiaryRepository} from "$lib/server/infrastructure/DiaryRepository";
import {DatabaseFactory} from "$lib/server/infrastructure/DatabaseFactory";
import {entryToPresentation} from "$lib/server/domain/mapper/EntryMapper";
import {EntryId} from "$lib/server/domain/models/Entry";
import {error, fail, redirect} from "@sveltejs/kit";
import { DiaryId } from '$lib/server/domain/models/DiaryId';

export const load: PageLoad = async ({params}) => {
    const diaryService = new DiaryService(new DiaryRepository(await DatabaseFactory.connect()))
    const entryId = new EntryId(parseInt(params.entryId))
    const diaryId= new DiaryId(params.diaryId)
    const entry = await diaryService.getEntryById(diaryId, entryId)

    if (entry === undefined) {
        return error(404)
    }

    return {
        diaryId: diaryId.value,
        entry: entryToPresentation(entry),
    }
};

export const actions = {
    delete: async (event) => {
        const diaryService = new DiaryService(new DiaryRepository(await DatabaseFactory.connect()))
        const entryId = new EntryId(parseInt(event.params.entryId));

        await diaryService.deleteEntry(entryId)

        throw redirect(303, "/diary")
    }
} satisfies Actions