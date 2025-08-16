import type { NotePayload, NoteResponse } from "@/types/note";
import { Axios } from "./base-service"
import type { AxiosPromise } from "axios";

export const GetAllNotes = async (): AxiosPromise<NoteResponse[]> => {
    return await Axios.get("/api/notes");
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

export const GetNoteById = async (noteId: number): AxiosPromise<NoteResponse> => {
    return await Axios.get(`/api/notes/${noteId}`);
}