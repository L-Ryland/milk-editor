import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

const initStorage = () => ({
  ipcRenderer
});
let storage = initStorage();
const resetStorage = () => storage = initStorage();
// Custom APIs for renderer
export const api = {
  ping: () => ipcRenderer.invoke('ping'),
  onDrop(fileName: any) {
    console.log("fileName", fileName, process.cwd());
    storage.ipcRenderer.send('file:upload', fileName, process.cwd());
  },
  openFile(file: FilePayload) {
    // const ipcRenderer = electronAPI.ipcRenderer;
    return ipcRenderer.invoke("file:open", file) as Promise<string>;
  },
  saveFile(file: FilePayload) {
    console.log("invoke file:save");
    return ipcRenderer.invoke("file:save", file);
  },
  saveTempFile(file: FilePayload) {
    return ipcRenderer.invoke("file:savetemp", file);
  },
};

ipcRenderer.prependListener;

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
    console.log("exposeInMainWorld");
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
