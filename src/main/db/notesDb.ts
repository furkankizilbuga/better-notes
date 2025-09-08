import type { Note, NotePayload, NoteResponse } from "@/renderer/types/note";
import { getDb } from "./index.js";
import type { NoteSyncResponse } from "@/renderer/types/sync";
import { v4 as uuidv4 } from "uuid";
import { getLocalDateTime } from "../../renderer/lib/utils.js";

export const GetAllNotes = (): Promise<Note[]> => {
    const db = getDb();
    const notes = db.prepare(`
        SELECT * FROM notes WHERE isDeleted=0
    `).all();
    return notes.map((note: NoteResponse) => ({
        ...note,
        content: JSON.parse(note.content)
    }))
};

export const GetAllShortNotes = (): Promise<Note[]> => {
    const db = getDb();
    const notes = db.prepare(`
        SELECT * FROM notes WHERE isShort=1 AND isDeleted=0
    `).all();
    return notes.map((note: NoteResponse) => ({
        ...note,
        content: JSON.parse(note.content)
    }))
};

export const GetByExternalId = (externalId: string): NoteResponse => {
    const db = getDb();
    return db.prepare(`
        SELECT * FROM notes WHERE externalId=? 
    `).get(externalId);
};

export const GetAllByExternalIds = (externalIds: string[]): NoteResponse[] => {
    if (externalIds.length === 0) return [];
    const db = getDb();
    const placeholders = externalIds.map(() => '?').join(',');
    return db.prepare(`
        SELECT * FROM notes WHERE externalId IN (${placeholders})
    `).all(...externalIds);
};

export const CreateNote = (notePayload: NotePayload): Promise<Note> => {
    const db = getDb();
    const externalId = uuidv4();
    const updatedAt = getLocalDateTime();

    db.prepare(`
        INSERT INTO note_changes (externalId, operation, updatedAt)
        VALUES (?, ?, ?)
    `).run(externalId, 'create', updatedAt);
    db.prepare(`
        INSERT INTO notes (externalId, title, content, isShort, isDeleted, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(externalId, notePayload.title || '', JSON.stringify(notePayload.content) || '', 0, 0, updatedAt);

    return Promise.resolve({
        externalId,
        title: notePayload.title,
        content: notePayload.content,
        isShort: false,
        isDeleted: false,
        updatedAt
    });
};

export const CreateShortNote = (notePayload: NotePayload): Promise<Note> => {
    const db = getDb();
    const externalId = uuidv4();
    const updatedAt = getLocalDateTime();

    db.prepare(`
        INSERT INTO note_changes (externalId, operation, updatedAt)
        VALUES (?, ?, ?)
    `).run(externalId, 'create', updatedAt);
    db.prepare(`
        INSERT INTO notes (externalId, title, content, isShort, isDeleted, updatedAt)
        VALUES (?, ?, ?, ?, ?)
    `).run(externalId, notePayload.title || '', JSON.stringify(notePayload.content) || '', 1, 0, updatedAt);

    return Promise.resolve({
        externalId,
        title: notePayload.title,
        content: notePayload.content,
        isShort: true,
        isDeleted: false,
        updatedAt
    });
};

export const UpdateNoteByExternalId = (notePayload: NotePayload, externalId: string): Promise<Note> => {
    const db = getDb();
    const updatedAt = getLocalDateTime();

    db.prepare(`
        INSERT INTO note_changes (externalId, operation, updatedAt)
        VALUES (?, ?, ?)
        ON CONFLICT(externalId) DO UPDATE SET 
            operation=excluded.operation,
            updatedAt=excluded.updatedAt
    `).run(externalId, 'update', updatedAt);
    db.prepare(`
        UPDATE notes SET title=?, content=? WHERE externalId=?
    `).run(notePayload.title || '', JSON.stringify(notePayload.content) || '', externalId);

    return Promise.resolve({
        externalId,
        title: notePayload.title,
        content: notePayload.content,
        isShort: true,
        isDeleted: false,
        updatedAt
    });
};

export const DeleteNoteByExternalId = (externalId: string): void => {
    const db = getDb();
    const updatedAt = getLocalDateTime();
    const note = GetByExternalId(externalId);

    db.prepare(`
        INSERT INTO note_changes (externalId, operation, updatedAt)
        VALUES (?, ?, ?)
        ON CONFLICT(externalId) DO UPDATE SET
            operation=excluded.operation,
            updatedAt=excluded.updatedAt
    `).run(externalId, 'delete', updatedAt);
    db.prepare(`
        UPDATE notes SET title=?, content=? WHERE externalId=?
    `).run(note.title, note.content, externalId);
};

// Postgre'den gelen değişiklikleri sqlite notes tablosuna ekler.
export const SyncWithPostgre = (notes: NoteSyncResponse[]) => {
    if (notes.length === 0) return;
    const db = getDb();

    const placeholders = notes.map(() => '(?, ?, ?, ?)').join(', ');
    const values: (string | number | boolean)[] = [];
    notes.forEach(note => {
        values.push(note.externalId, note.title, note.content, note.isShort, note.isDeleted, note.updatedAt);
    });

    const sql = `
        INSERT INTO notes (externalId, title, content, isShort, isDeleted, updatedAt)
        VALUES ${placeholders}
        ON CONFLICT(externalId) DO UPDATE SET
            title = excluded.title,
            content = excluded.content,
            isShort = excluded.isShort,
            isDeleted = excluded.isDeleted,
            updatedAt = excluded.updatedAt
    `;

    db.prepare(sql).run(...values);
};

export const GetAllChanges = () => {
    const db = getDb();
    return db.prepare(`
        SELECT * FROM note_changes    
    `).all();
};

export const ClearChanges = () => {
    const db = getDb();
    db.prepare(`
        DELETE FROM note_changes
    `).run();
};
