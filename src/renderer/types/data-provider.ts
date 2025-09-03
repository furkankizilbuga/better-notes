import type { Note, NotePayload } from "./note";

// TODO: return tipleri tek tip yapılacak.
export interface IDataProvider {
    GetAllNotes(): Promise<Note[]>;
    CreateNote(notePayload: NotePayload): Promise<Note>;
}