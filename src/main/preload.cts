import { contextBridge } from 'electron';

const electronHandler = {
    isElectron: true,
    ipcRenderer: {

    }
}

contextBridge.exposeInMainWorld("env", electronHandler);
export type ElectronHandler = typeof electronHandler;