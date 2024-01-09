import type {DiaryRepository} from "$lib/server/infrastructure/DiaryRepository";
import type {AddNewEntryRequest} from "$lib/server/domain/models/inbound/AddNewEntryRequest";
import {getSpotifyEmbed} from "$lib/server/infrastructure/SpotifyRepository";
import {Entry, EntryId} from "$lib/server/domain/models/Entry";
import type {UpdateEntryRequest} from "$lib/server/domain/models/inbound/UpdateEntry";
import {uploadImage} from "$lib/server/service/ImageUploadService";
import type {Diary} from "$lib/server/domain/models/Diary";
import type {DiaryId} from "$lib/server/domain/models/DiaryId";


export class DiaryService {
    constructor(private repository: DiaryRepository) {
    }

    public async getDiaryById(diaryId: DiaryId): Promise<Diary | undefined> {
        return await this.repository.getDiaryById(diaryId);
    }

    async addEntryToDiary(diaryId: DiaryId, newEntry: AddNewEntryRequest) {
        const diary = await this.repository.getDiaryById(diaryId)

        if (!diary) {
            throw Error(`Diary with id ${diaryId.value} not found`)
        }

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

        diary.addEntry(entry)
        await this.repository.saveDiary(diary);
    }

    async attachImageToEntry(entryId: EntryId, imgFile: File) {
        const entry = await this.repository.getEntryById(entryId);
        if (entry) {
            const img = await uploadImage(imgFile)
            entry.attachNewImage(img)
            await this.repository.updateEntry(entry)
        }
    }

    async getEntryById(diaryId: DiaryId, entryId: EntryId): Promise<Entry | undefined> {
        const diary = await this.repository.getDiaryById(diaryId);
        return diary?.getEntry(entryId)
    }

    async editEntry(updateEntry: UpdateEntryRequest): Promise<Entry> {
        const entry = await this.repository.getEntryById(updateEntry.id)

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