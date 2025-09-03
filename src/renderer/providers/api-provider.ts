import { CreateNote, GetAllNotes } from "@/renderer/services/note-service";
import type { IDataProvider } from "@/renderer/types/data-provider";
import type { Note, NotePayload } from "@/renderer/types/note";

export class ApiProvider implements IDataProvider {
    GetAllNotes = async (): Promise<Note[]> => {
        return await GetAllNotes({ isShort: false });
    }

    CreateNote = async (note: NotePayload): Promise<Note> => {
        return await CreateNote(note);
    }
}