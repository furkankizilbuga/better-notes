import { ipcMain } from "electron";
import { CreateNote, CreateShortNote, GetAllNotes, GetAllShortNotes, UpdateNoteByExternalId } from "../db/notesDb.js";
import { NotePayload } from "../../renderer/types/note.js";

ipcMain.handle("GetAllNotes", async () => {
    return await GetAllNotes();
});

ipcMain.handle("GetAllShortNotes", async () => {
    return await GetAllShortNotes();
});

ipcMain.handle("CreateNote", async (_event, notePayload: NotePayload) => {
    return await CreateNote(notePayload);
});

ipcMain.handle("CreateShortNote", async (_event, notePayload: NotePayload) => {
    return await CreateShortNote(notePayload);
});

ipcMain.handle("UpdateNoteByExternalId", async (_event, notePayload: NotePayload, externalId: string) => {
    return await UpdateNoteByExternalId(notePayload, externalId);
});
