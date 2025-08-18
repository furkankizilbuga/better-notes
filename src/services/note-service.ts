import type { Note, NotePayload, NoteResponse } from "@/types/note";
import { Axios } from "./base-service"
import type { AxiosPromise } from "axios";

export const GetAllNotes = async (): Promise<Note[]> => {
    try {
        const response = await Axios.get("/api/notes");
        return response.data.map((note: NoteResponse) => ({
            ...note,
            content: JSON.parse(note.content)
        }))
    } catch (err) {
        console.error(err);
        throw new Error("An error occured while fetching notes.")
    }
}

export const CreateNote = async (note: NotePayload): AxiosPromise<NoteResponse> => {
    return await Axios.post("/api/notes", {
        ...note,
        content: JSON.stringify(note.content)
    });
}

export const UpdateNoteById = async (note: NotePayload, noteId: number): AxiosPromise<NoteResponse> => {
    return await Axios.put(`/api/notes/${noteId}`, {
        id: noteId,
        ...note,
        content: JSON.stringify(note?.content)
    });
}

export const GetNoteById = async (noteId: number): Promise<Note> => {
    try {
        const response = await Axios.get(`/api/notes/${noteId}`);
        return {
            ...response.data,
            content: JSON.parse(response.data.content)
        }
    } catch (err) {
        console.error(err);
        throw new Error("An error occured while fetching note.")
    }
}