import type { Note, NotePayload } from "./note";

export interface IDataProvider {
    GetAllNotes(): Promise<Note[]>;
    GetAllShortNotes(): Promise<Note[]>;
    GetNoteByExternalId(externalId: string): Promise<Note>;
    CreateNote(notePayload: NotePayload): Promise<Note>;
    CreateShortNote(notePayload: NotePayload): Promise<Note>;
    UpdateNoteByExternalId(notePayload: NotePayload, externalId: string): Promise<Note>;
}