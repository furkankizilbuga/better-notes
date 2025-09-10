import type { NotePayload } from '@/renderer/types/note';
import { contextBridge, ipcRenderer } from 'electron';

const electronHandler = {
    isElectron: true,
    dataService: {
        GetAllNotes: () => ipcRenderer.invoke('GetAllNotes'),
        GetAllShortNotes: () => ipcRenderer.invoke('GetAllShortNotes'),
        GetNoteByExternalId: (externalId: string) => ipcRenderer.invoke('GetNoteByExternalId', externalId),
        CreateNote: (notePayload: NotePayload) => ipcRenderer.invoke('CreateNote', notePayload),
        CreateShortNote: (notePayload: NotePayload) => ipcRenderer.invoke('CreateShortNote', notePayload),
        UpdateNoteByExternalId: (notePayload: NotePayload, externalId: string) => ipcRenderer.invoke('UpdateNoteByExternalId', notePayload, externalId),
    },
}

contextBridge.exposeInMainWorld("electron", electronHandler);
export type ElectronHandler = typeof electronHandler;