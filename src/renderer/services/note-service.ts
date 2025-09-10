import type { Note, NotePayload, NoteResponse } from "@/renderer/types/note";
import { Axios } from "./base-service"
import { stringToJSONContent } from "@/renderer/lib/utils";

/*
    Direkt backende gidiyorsa externalId orada oluşturuluyor.
    eğer sqlite'a kaydediliyorsa burada oluşturuluyor.
    sync edilirken direkt o kullanılıyor.
*/

export const GetAllNotes = async ({ isShort = false }: { isShort: boolean }): Promise<Note[]> => {
    try {
        const response = await Axios.get(`/api/notes?isShort=${isShort}`);
        return response.data.map((note: NoteResponse) => ({
            ...note,
            content: stringToJSONContent(note.content)
        }))
    } catch (err) {
        console.error(err);
        throw new Error("An error occured while fetching notes.")
    }
};

export const CreateNote = async (notePayload: NotePayload): Promise<Note> => {
    try {
        const response = await Axios.post("/api/notes", {
            ...notePayload,
            content: JSON.stringify(notePayload.content)
        });
        const { data } = response;
        return Promise.resolve({
            ...data,
            content: stringToJSONContent(data.content)
        });
    } catch (err) {
        console.error(err);
        throw new Error("An error occured while creating note.")
    }
};

export const CreateShortNote = async (notePayload: NotePayload): Promise<Note> => {
    try {
        const response = await Axios.post("/api/notes", {
            ...notePayload,
            content: JSON.stringify(notePayload.content),
            isShort: true
        });
        const { data } = response;
        return Promise.resolve({
            ...data,
            content: stringToJSONContent(data.content)
        });
    } catch (err) {
        console.error(err);
        throw new Error("An error occured while creating short note.")
    }

};

export const UpdateNoteByExternalId = async (note: NotePayload, externalId: string): Promise<Note> => {
    try {
        const response = await Axios.put(`/api/notes?externalId=${externalId}`, {
            externalId,
            ...note,
            content: JSON.stringify(note?.content)
        });
        const { data } = response;
        return Promise.resolve({
            ...data,
            content: stringToJSONContent(data.content)
        });
    } catch (err) {
        console.error(err);
        throw new Error("An error occured while updating note.")
    }
};

export const GetNoteByExternalId = async (externalId: string): Promise<Note> => {
    try {
        const response = await Axios.get(`/api/notes?externalId=${externalId}`);
        const { data } = response;
        return {
            ...data,
            content: stringToJSONContent(data.content)
        }
    } catch (err) {
        console.error(err);
        throw new Error("An error occured while fetching note.")
    }
};