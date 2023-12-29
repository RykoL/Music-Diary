import type {PageLoad} from './$types';
import {DiaryService} from "$lib/server/service/DiaryService";
import {DiaryRepository} from "$lib/server/infrastructure/DiaryRepository";
import {DatabaseFactory} from "$lib/server/infrastructure/DatabaseFactory";
import {entryToPresentation} from "$lib/server/domain/mapper/EntryMapper";
import {EntryId} from "$lib/server/domain/models/Entry";
import {fail, redirect} from "@sveltejs/kit";
import type {Actions} from "../../../../../../.svelte-kit/types/src/routes/diary/entry/[slug]/$types";
import {UpdateEntryRequest} from "$lib/server/domain/models/inbound/UpdateEntry";

export const load: PageLoad = async ({params}) => {
    const diaryService = new DiaryService(new DiaryRepository(await DatabaseFactory.connect()))
    const entryId = new EntryId(parseInt(params.slug))
    const entry = await diaryService.getEntryById(entryId)
    if (entry === undefined) {
        return fail(404)
    }

    return {
        entry: entryToPresentation(entry)
    }
};

export const actions = {
    default: async (event) => {
        const diaryService = new DiaryService(new DiaryRepository(await DatabaseFactory.connect()))
        const entryId = new EntryId(parseInt(event.params.slug));
        const updateEntry = UpdateEntryRequest.fromForm(entryId, await event.request.formData())

        if (!updateEntry) {
            return fail(400)
        }

        await diaryService.updateEntry(updateEntry)

        throw redirect(303, "/diary")
    }
} satisfies Actions