import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import { env } from '$env/dynamic/private';

const getSqliteConnection = async () => {
	const dbNameToUse = env.NODE_ENV === 'test' ? ':memory:' : DatabaseFactory.dbName;
	const db = await open({ filename: dbNameToUse, driver: sqlite3.cached.Database });
	await db.migrate({
		migrationsPath: './migrations/'
	});
	return db;
};

export class DatabaseFactory {
	static dbName: string = 'diary.sqlite3';
	static dbInstance: Database | null = null;

	static async connect(): Promise<Database> {
		if (this.dbInstance) {
			return this.dbInstance;
		}
		const db = await getSqliteConnection();

		this.dbInstance = db;
		return db;
	}
}
