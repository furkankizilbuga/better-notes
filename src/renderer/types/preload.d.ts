export {};

declare global {
  interface Window {
    electron: ElectronHandler;
  }
}
