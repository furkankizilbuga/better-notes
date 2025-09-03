import type { NoteChange, NoteSyncResponse } from "@/renderer/types/sync";
import { Axios } from "./base-service"
import { GetAllChanges, GetAllByExternalIds } from "@/main/db/notesDb";

export const UploadChanges = async () => {
    const changes = GetAllChanges();
    const ids = changes.map((change: NoteChange) => change.externalId);
    const notes = GetAllByExternalIds(ids);
    await Axios.post('/api/sync/notes', notes);
};

export const DownloadChanges = async (): Promise<NoteSyncResponse[]> => {
    try {
        const response = await Axios.get('/api/sync/notes')
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error("An error occured while fetching changes.")
    }
};