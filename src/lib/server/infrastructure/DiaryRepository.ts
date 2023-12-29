import type {Database} from "sqlite";
import {EntryEntity, type EntryRow} from "$lib/server/entity/EntryEntity";
import type {Entry, EntryId} from "$lib/server/domain/models/Entry";

export class DiaryRepository {

    private db: Database

    constructor(db: Database) {
        this.db = db
    }

    public async getDiaryEntries(): Promise<Array<EntryEntity>> {
        const entries = await this.db.all<EntryRow[]>(`
            SELECT entries.id as entryId, title, content, date, song.id as songId, url, embed FROM entries 
            JOIN song on song.id = entries.songId
            ORDER BY date DESC LIMIT 10;
        `);
        return entries.map(EntryEntity.fromRow)
    }

    public async getEntryById(entryId: EntryId): Promise<EntryEntity | undefined> {
        const entry = await this.db.get<EntryRow>(`
            SELECT entries.id as entryId, title, content, date, song.id as songId, url, embed FROM entries 
            JOIN song on song.id = entries.songId
            where entries.id = ?;`, entryId.value);
        if (entry) {
            return EntryEntity.fromRow(entry)
        }
    }

    async addNewEntry(newEntry: Entry) {
        const songQuery: string = "INSERT OR IGNORE INTO song(id, url, embed) VALUES (?, ?, ?);"

        const query: string = `INSERT INTO entries(title, content, date, songId)
                               VALUES (?, ?, ?, ?);`
        try {
            await this.db.run("BEGIN TRANSACTION;")
            await this.db.run(songQuery, [
                newEntry.song.id.value,
                newEntry.song.spotifyURL.value,
                newEntry.song.html,
            ])
            await this.db.run(query, [
                newEntry.title,
                newEntry.content,
                newEntry.date,
                newEntry.song.id.value
            ])
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