import type {Database} from "sqlite";
import {mapSingleEntry, type EntryRecord, mapEntries} from "$lib/server/entity/EntryMapper";
import type {Entry, EntryId} from "$lib/server/domain/models/Entry";

import type {DiaryId} from "$lib/server/domain/models/DiaryId";
import type {Diary} from "$lib/server/domain/models/Diary";
import {diaryMapper, type DiaryRecord, mapDiaries} from "$lib/server/entity/DiaryMapper";

export class DiaryRepository {

    private db: Database

    constructor(db: Database) {
        this.db = db
    }

    public async getEntryById(entryId: EntryId): Promise<Entry | undefined> {
        const entry = await this.db.all<EntryRecord[]>(`
            SELECT entry.id as entryId,
                   title,
                   content,
                   date,
                   song.id  as songId,
                   url,
                   embed,
                   image.id as imageId
            FROM entry
                     JOIN song on song.id = entry.songId
                     LEFT JOIN image on entry.id = image.entry_id
            where entry.id = ?;`, entryId.value);
        if (entry) {
            return mapSingleEntry(entry)
        }
    }

    public async getDiaryById(diaryId: DiaryId): Promise<Diary | undefined> {
        const records = await this.db.all<DiaryRecord[]>(`
            SELECT diary.id          as diaryId,
                   diary.title       as diaryTitle,
                   diary.description as diaryDescription,
                   entry.id          as entryId,
                   entry.title       as entryTitle,
                   content,
                   date,
                   song.id           as songId,
                   url,
                   embed,
                   image.id          as imageId
            FROM diary
                     LEFT JOIN entry on diary.id = entry.diaryId
                     LEFT JOIN song on song.id = entry.songId
                     LEFT JOIN image on entry.id = image.entry_id
            WHERE diary.id = ?
            ORDER BY date DESC;
        `, diaryId.value);
        return diaryMapper(records)
    }

    async removeEntry(entryId: EntryId) {
        await this.db.run("DELETE from entry where id = ?", entryId.value)
    }

    async updateEntry(entry: Entry) {
        const songQuery: string = "INSERT OR IGNORE INTO song(id, url, embed) VALUES (?, ?, ?);"

        const imageQuery: string = "INSERT OR IGNORE INTO image VALUES (?, ?);"
        const query: string = `UPDATE entry
                               SET title   = ?,
                                   content = ?,
                                   date    = ?,
                                   songId  = ?
                               WHERE id = ?;`
        try {
            await this.db.run("BEGIN TRANSACTION;")
            await this.db.run(songQuery, [
                entry.song.id.value,
                entry.song.spotifyURL.value,
                entry.song.html,
            ])
            await this.db.run(query, [
                entry.title.value,
                entry.content,
                entry.date,
                entry.song.id.value,
                entry.id.value
            ])
            await Promise.all(entry.getUnAttachedImages().map(img => this.db.run(imageQuery, [entry.id.value, img.id.value])))
            await this.db.run("COMMIT;")
        } catch (e) {
            await this.db.run("ROLLBACK")
        }
    }

    async saveEntry(newEntry: Entry) {
        const songQuery: string = "INSERT OR IGNORE INTO song(id, url, embed) VALUES (?, ?, ?);"

        const query: string = `INSERT INTO entry(title, content, date, songId, diaryId)
                               VALUES (?, ?, ?, ?, ?)
                               RETURNING id;`
        const imageQuery: string = `INSERT INTO image(id, entry_id)
                                    VALUES (?, ?);`

        try {
            await this.db.run("BEGIN TRANSACTION;")
            await this.db.run(songQuery, [
                newEntry.song.id.value,
                newEntry.song.spotifyURL.value,
                newEntry.song.html,
            ])
            const entryId = await this.db.get<{ id: number }>(query, [
                newEntry.title.value,
                newEntry.content,
                newEntry.date,
                newEntry.song.id.value,
                newEntry.id.value
            ])
            await Promise.all(newEntry.getUnAttachedImages().map((img) => {
                return this.db.run(imageQuery, [img.id.value, entryId?.id])
            }))
            await this.db.run("COMMIT;")
        } catch (e) {
            await this.db.run("ROLLBACK")
        }
    }

    async getDiaries(): Promise<Array<Diary>> {
        const records = await this.db.all<Array<DiaryRecord>>('SELECT id as diaryId, title as diaryTitle, description as diaryDescription from diary;')
        return mapDiaries(records);
    }
}