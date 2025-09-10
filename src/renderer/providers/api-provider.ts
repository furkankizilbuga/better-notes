import { CreateNote, CreateShortNote, GetAllNotes, UpdateNoteByExternalId } from "@/renderer/services/note-service";
import type { IDataProvider } from "@/renderer/types/data-provider";
import type { Note, NotePayload } from "@/renderer/types/note";

export class ApiProvider implements IDataProvider {
    GetAllNotes = async (): Promise<Note[]> => {
        return await GetAllNotes({ isShort: false });
    }

    GetAllShortNotes = async (): Promise<Note[]> => {
        return await GetAllNotes({ isShort: true });
    }

    CreateNote = async (notePayload: NotePayload): Promise<Note> => {
        return await CreateNote(notePayload);
    }

    CreateShortNote = async (notePayload: NotePayload): Promise<Note> => {
        return await CreateShortNote(notePayload);
    }

    UpdateNoteByExternalId = async (notePayload: NotePayload, externalId: string): Promise<Note> => {
        return await UpdateNoteByExternalId(notePayload, externalId);
    }
}