import type {DiaryRepository} from "$lib/server/infrastructure/DiaryRepository";
import type {AddNewEntryRequest} from "$lib/server/domain/models/inbound/AddNewEntryRequest";
import {getSpotifyEmbed} from "$lib/server/infrastructure/SpotifyRepository";
import {Entry, EntryId} from "$lib/server/domain/models/Entry";
import type {UpdateEntryRequest} from "$lib/server/domain/models/inbound/UpdateEntry";
import {uploadImage} from "$lib/server/service/ImageUploadService";


export class DiaryService {
    constructor(private repository: DiaryRepository) {
    }

    public async getAllEntries(): Promise<Entry[]> {
        return await this.repository.getDiaryEntries()
    }

    async addNewEntry(newEntry: AddNewEntryRequest) {
        const embedding = await getSpotifyEmbed(newEntry.song)
        const images = await Promise.all(newEntry.images.map(imgFile => {
            return uploadImage(imgFile)
        }))
        const entry = Entry
            .builder()
            .song(embedding)
            .title(newEntry.title)
            .content(newEntry.content)
            .date(newEntry.date)
            .withImages(...images)
            .build();

        await this.repository.addNewEntry(entry)
    }

    async attachImageToEntry(entryId: EntryId, imgFile: File) {
        const entry = await this.getEntryById(entryId);
        if (entry) {
            const img = await uploadImage(imgFile)
            entry.attachNewImage(img)
            await this.repository.updateEntry(entry)
        }
    }

    async getEntryById(entryId: EntryId) {
        return await this.repository.getEntryById(entryId);
    }

    async editEntry(updateEntry: UpdateEntryRequest): Promise<Entry> {
        const entry = await this.getEntryById(updateEntry.id)

        if (!entry) {
            throw new Error(`Entry with id ${updateEntry.id.value} does not exist`)
        }

        entry.title = updateEntry.title
        entry.content = updateEntry.content
        entry.date = updateEntry.date

        if (!entry.song.isSameSong(updateEntry.song.getId())) {
            entry.song = await getSpotifyEmbed(updateEntry.song)
        }

        await this.repository.updateEntry(entry)

        return entry
    }

    async deleteEntry(entryId: EntryId) {
        await this.repository.removeEntry(entryId)
    }
}