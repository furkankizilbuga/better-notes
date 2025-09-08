import { ipcMain } from "electron";
import { CreateNote, CreateShortNote, GetAllNotes, GetAllShortNotes } from "../db/notesDb.js";
import { NotePayload } from "../../renderer/types/note.js";

ipcMain.handle("GetAllNotes", async () => {
    return await GetAllNotes();
});

ipcMain.handle("GetAllShortNotes", async () => {
    return await GetAllShortNotes();
});

ipcMain.handle("CreateNote", async (_event, note: NotePayload) => {
    return await CreateNote(note);
});

ipcMain.handle("CreateShortNote", async (_event, note: NotePayload) => {
    return await CreateShortNote(note);
});
