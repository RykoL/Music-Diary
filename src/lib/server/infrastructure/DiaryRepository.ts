import type {Database} from "sqlite";
import {EntryMapper, type EntryRow} from "$lib/server/entity/EntryEntity";
import type {Entry, EntryId} from "$lib/server/domain/models/Entry";

export class DiaryRepository {

    private db: Database

    constructor(db: Database) {
        this.db = db
    }

    public async getDiaryEntries(): Promise<Array<Entry>> {
        const entries = await this.db.all<EntryRow[]>(`
            SELECT entries.id as entryId, title, content, date, song.id as songId, url, embed, image.id as imageId FROM entries 
            JOIN song on song.id = entries.songId
            LEFT JOIN image on entries.id = image.entry_id                                                                     
            ORDER BY date DESC;
        `);
        const entryMap = new Map<number,EntryRow[]>()
        entries.forEach((row) => {
            entryMap.set(row.entryId, [...entryMap.get(row.entryId) ?? [], row])
        })
        return Array.from(entryMap.values()).map(EntryMapper)
    }

    public async getEntryById(entryId: EntryId): Promise<Entry | undefined> {
        const entry = await this.db.all<EntryRow[]>(`
            SELECT entries.id as entryId, title, content, date, song.id as songId, url, embed, image.id as imageId FROM entries 
            JOIN song on song.id = entries.songId
            LEFT JOIN image on entries.id = image.entry_id
            where entries.id = ?;`, entryId.value);
        if (entry) {
            return EntryMapper(entry)
        }
    }

    async addNewEntry(newEntry: Entry) {
        const songQuery: string = "INSERT OR IGNORE INTO song(id, url, embed) VALUES (?, ?, ?);"

        const query: string = `INSERT INTO entries(title, content, date, songId)
                               VALUES (?, ?, ?, ?) RETURNING id;`
        const imageQuery: string = `INSERT INTO image(id, entry_id) VALUES (?, ?);`
        try {
            await this.db.run("BEGIN TRANSACTION;")
            await this.db.run(songQuery, [
                newEntry.song.id.value,
                newEntry.song.spotifyURL.value,
                newEntry.song.html,
            ])
            const entryId = await this.db.get<{id: number}>(query, [
                newEntry.title.value,
                newEntry.content,
                newEntry.date,
                newEntry.song.id.value
            ])
            await Promise.all(newEntry.images.map((img) => {
                return this.db.run(imageQuery, [img.id.value, entryId?.id])
            }))
            await this.db.run("COMMIT;")
        } catch (e) {
            await this.db.run("ROLLBACK")
            console.log(e)
        }
    }

    async removeEntry(entryId: EntryId) {
        await this.db.run("DELETE from entries where id = ?", entryId.value)
    }

    async updateEntry(entry: Entry) {
        const songQuery: string = "INSERT OR IGNORE INTO song(id, url, embed) VALUES (?, ?, ?);"

        const query: string = `UPDATE entries
                               SET title = ?, content = ?, date = ?, songId = ?
                               WHERE id = ?;`
        try {
            await this.db.run("BEGIN TRANSACTION;")
            await this.db.run(songQuery, [
                entry.song.id.value,
                entry.song.spotifyURL.value,
                entry.song.html,
            ])
            await this.db.run(query, [
                entry.title,
                entry.content,
                entry.date,
                entry.song.id.value,
                entry.id.value
            ])
            await this.db.run("COMMIT;")
        } catch (e) {
            await this.db.run("ROLLBACK")
            console.log(e)
        }
    }
}