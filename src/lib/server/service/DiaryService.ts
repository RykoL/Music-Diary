import type {DiaryRepository} from "$lib/server/infrastructure/DiaryRepository";
import type {EntryDraft} from "$lib/server/domain/inbound/EntryDraft";
import {updateSongEmbedding} from "$lib/server/infrastructure/SpotifyRepository";
import type {Entry, EntryId} from "$lib/server/domain/models/Entry";
import type {UpdateEntryRequest} from "$lib/server/domain/inbound/UpdateEntry";
import {uploadImage, uploadImages} from "$lib/server/service/ImageUploadService";
import type {Diary} from "$lib/server/domain/models/Diary";
import type {DiaryId} from "$lib/server/domain/models/DiaryId";
import {DatabaseFactory} from "$lib/server/infrastructure/DatabaseFactory";
import type {NewDiary} from "$lib/server/domain/inbound/NewDiary";
import {User} from "$lib/server/domain/models/User";


export class DiaryService {
    constructor(private repository: DiaryRepository) {
    }

    public async getDiaryById(diaryId: DiaryId): Promise<Diary | undefined> {
        return await this.repository.getDiaryById(diaryId);
    }

    public async listDiaryEntries(diaryId: DiaryId): Promise<Entry[]> {
        return await this.repository.getEntriesByDiaryId(diaryId);
    }

    async addEntryToDiary(diaryId: DiaryId, newEntry: EntryDraft) {
        const diary = await this.repository.getDiaryById(diaryId)

        if (!diary) {
            throw Error(`Diary with id ${diaryId.value} not found`)
        }

        const entry = diary.writeEntry(newEntry)

        await uploadImages(...entry.getUnAttachedImages())

        await this.repository.saveEntry(entry);

        const db = await DatabaseFactory.connect()
        await updateSongEmbedding(db, entry.song)
    }

    async attachImageToEntry(entryId: EntryId, imgFile: File) {
        const entry = await this.repository.getEntryById(entryId);
        if (entry) {
            const img = entry.attachNewImage(imgFile)
            await uploadImage(img)
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

        entry.rewrite(updateEntry.title, updateEntry.content, updateEntry.date)

        if (!entry.hasSong(updateEntry.song.getId())) {
            entry.linkSong(updateEntry.song)
        }

        await this.repository.updateEntry(entry)

        return entry
    }

    async deleteEntry(entryId: EntryId) {
        await this.repository.removeEntry(entryId)
    }

    async listDiaries(): Promise<Array<Diary>> {
        return await this.repository.getDiaries()
    }

    async startNewDiary(newDiary: NewDiary) {
        const user = User.anonymous();
        const diary = user.startNewDiary(newDiary.title, newDiary.description)

        await this.repository.saveDiary(diary)
    }

    async deleteDiary(diaryId: DiaryId) {
        await this.repository.removeDiary(diaryId)
    }
}