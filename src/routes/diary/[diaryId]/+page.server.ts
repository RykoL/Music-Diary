import type {Actions, PageServerLoad} from './$types';
import {mapToEntryListResponse} from "$lib/server/domain/mapper/EntryMapper";
import {DiaryService} from "$lib/server/service/DiaryService";
import {DiaryRepository} from "$lib/server/infrastructure/DiaryRepository";
import {DatabaseFactory} from "$lib/server/infrastructure/DatabaseFactory";
import {AddNewEntryRequest} from "$lib/server/domain/models/inbound/AddNewEntryRequest";
import {fail, redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    const diaryService = new DiaryService(new DiaryRepository(await DatabaseFactory.connect()))
    return {
        entries: mapToEntryListResponse(await diaryService.getAllEntries())
    };
};

export const actions = {
    default: async (event) => {
        const db = await DatabaseFactory.connect()
        const diaryService = new DiaryService(new DiaryRepository(db))
        const newEntry = AddNewEntryRequest.fromForm(await event.request.formData())
        if (newEntry) {
            await diaryService.addNewEntry(newEntry)
        } else {
            console.error("Validation of form data failed")
            return fail(400)
        }

        throw redirect(303, "/diary")
    },
} satisfies Actions;