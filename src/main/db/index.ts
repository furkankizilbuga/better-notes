import path from 'path'
import { app } from 'electron'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Database from 'better-sqlite3'

let db: Database;

export const initDb = () => {
    const dbPath = path.join(app.getPath('userData'), 'notes.db');
    db = new Database(dbPath);

    db.prepare(`
        CREATE TABLE IF NOT EXISTS notes (
            externalId TEXT PRIMARY KEY,
            title TEXT,
            content TEXT,
            updatedAt TEXT,
            isShort INTEGER DEFAULT 0,
            isDeleted INTEGER DEFAULT 0
        )    
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS note_changes (
            externalId TEXT PRIMARYI KEY,
            operation TEXT,
            updatedAt TEXT
        )    
    `).run();

    return db;
};

export const getDb = () => {
    if (!db) throw new Error('DB not initialized');
    return db;
};