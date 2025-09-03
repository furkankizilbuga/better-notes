import { ipcMain } from "electron";
import { CreateNote, GetAllNotes } from "../db/notesDb";
import { NotePayload } from "@/renderer/types/note";

ipcMain.handle("notes:get", async () => {
    return GetAllNotes();
});

ipcMain.handle("notes:create", async (_event, note: NotePayload) => {
    return CreateNote(note);
});
