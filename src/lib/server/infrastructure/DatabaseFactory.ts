import sqlite3, {Statement} from "sqlite3";
import {Database, open} from 'sqlite'
import { env } from '$env/dynamic/private';

export class DatabaseFactory {

    private static dbName: string = "diary.sqlite3";
    private static isMigrated: boolean = false;

    static async connect(): Promise<Database<sqlite3.Database, Statement>> {
        const dbNameToUse = env.NODE_ENV === 'test' ? ':memory:' : this.dbName
        const db = await open({filename: dbNameToUse, driver: sqlite3.cached.Database})
        await db.migrate({
            migrationsPath: "./migrations/"
        })
        return db
    }

}