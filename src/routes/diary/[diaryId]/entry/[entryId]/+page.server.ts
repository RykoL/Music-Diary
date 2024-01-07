import type {Actions, PageLoad} from './$types';
import {DiaryService} from "$lib/server/service/DiaryService";
import {DiaryRepository} from "$lib/server/infrastructure/DiaryRepository";
import {DatabaseFactory} from "$lib/server/infrastructure/DatabaseFactory";
import {entryToPresentation} from "$lib/server/domain/mapper/EntryMapper";
import {EntryId} from "$lib/server/domain/models/Entry";
import {fail, redirect} from "@sveltejs/kit";

export const load: PageLoad = async ({params}) => {
    const diaryService = new DiaryService(new DiaryRepository(await DatabaseFactory.connect()))
    const entryId = new EntryId(parseInt(params.entryId))
    const diaryId: string = params.diaryId
    const entry = await diaryService.getEntryById(entryId)
    if (entry === undefined) {
        return fail(404)
    }

    return {
        entry: entryToPresentation(entry),
        diaryId
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