import type { Note, NotePayload } from "./note";

export interface IDataProvider {
    GetAllNotes(): Promise<Note[]>;
    GetAllShortNotes(): Promise<Note[]>;
    CreateNote(notePayload: NotePayload): Promise<Note>;
    CreateShortNote(notePayload: NotePayload): Promise<Note>;
}