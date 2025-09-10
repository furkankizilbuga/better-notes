import { ipcMain } from "electron";
import { CreateNote, CreateShortNote, GetAllNotes, GetAllShortNotes, GetNoteByExternalId, UpdateNoteByExternalId } from "../db/notesDb.js";
import { NotePayload } from "../../renderer/types/note.js";
import { IpcEvents } from "../enums/ipcEvents.js";

ipcMain.handle(IpcEvents.GetAllNotes, async () => {
    return await GetAllNotes();
});

ipcMain.handle(IpcEvents.GetAllShortNotes, async () => {
    return await GetAllShortNotes();
});

ipcMain.handle(IpcEvents.GetNoteByExternalId, async (_event, externalId: string) => {
    return await GetNoteByExternalId(externalId);
});

ipcMain.handle(IpcEvents.CreateNote, async (_event, notePayload: NotePayload) => {
    return await CreateNote(notePayload);
});

ipcMain.handle(IpcEvents.CreateShortNote, async (_event, notePayload: NotePayload) => {
    return await CreateShortNote(notePayload);
});

ipcMain.handle(IpcEvents.UpdateNoteByExternalId, async (_event, notePayload: NotePayload, externalId: string) => {
    return await UpdateNoteByExternalId(notePayload, externalId);
});
