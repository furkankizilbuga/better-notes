import type { IDataProvider } from "@/renderer/types/data-provider";
import { CreateNote, GetAllNotes } from "@/main/db/notesDb";
import type { Note, NotePayload } from "@/renderer/types/note";

export class SqliteProvider implements IDataProvider {
    GetAllNotes = async (): Promise<Note[]> => {
        return GetAllNotes();
    }

    CreateNote = async (notePayload: NotePayload): Promise<Note> => {
        return CreateNote(notePayload);
    }
}