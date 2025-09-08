import { CreateNote, CreateShortNote, GetAllNotes } from "@/renderer/services/note-service";
import type { IDataProvider } from "@/renderer/types/data-provider";
import type { Note, NotePayload } from "@/renderer/types/note";

export class ApiProvider implements IDataProvider {
    GetAllNotes = async (): Promise<Note[]> => {
        return await GetAllNotes({ isShort: false });
    }

    GetAllShortNotes = async (): Promise<Note[]> => {
        return await GetAllNotes({ isShort: true });
    }

    CreateNote = async (note: NotePayload): Promise<Note> => {
        return await CreateNote(note);
    }

    CreateShortNote = async (note: NotePayload): Promise<Note> => {
        return await CreateShortNote(note);
    }
}