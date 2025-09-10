import type { IDataProvider } from "@/renderer/types/data-provider";
import type { Note, NotePayload } from "@/renderer/types/note";

export class SqliteProvider implements IDataProvider {
    GetAllNotes = async (): Promise<Note[]> => {
        return await window.electron.dataService.GetAllNotes();
    }

    GetAllShortNotes = async (): Promise<Note[]> => {
        return await window.electron.dataService.GetAllShortNotes();
    }

    GetNoteByExternalId = async (externalId: string): Promise<Note> => {
        return await window.electron.dataService.GetNoteByExternalId(externalId);
    }

    CreateNote = async (notePayload: NotePayload): Promise<Note> => {
        return await window.electron.dataService.CreateNote(notePayload);
    }

    CreateShortNote = async (notePayload: NotePayload): Promise<Note> => {
        return await window.electron.dataService.CreateShortNote(notePayload);
    }

    UpdateNoteByExternalId = async (notePayload: NotePayload, externalId: string): Promise<Note> => {
        return await window.electron.dataService.UpdateNoteByExternalId(notePayload, externalId);
    }
}