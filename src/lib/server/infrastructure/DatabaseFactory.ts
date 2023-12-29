import sqlite3, {Statement} from "sqlite3";
import {Database, open} from 'sqlite'

export class DatabaseFactory {

    private static dbName: string = "diary.sqlite3";
    private static isMigrated: boolean = false;

    static async connect(): Promise<Database<sqlite3.Database, Statement>> {
        sqlite3.verbose()
        const db = await open({filename: this.dbName, driver: sqlite3.cached.Database})
        await db.migrate({
            migrationsPath: "./migrations/"
        })
        return db
    }

}