import { app, dialog, ipcMain, type IpcMain, type IpcMainInvokeEvent } from "electron";
import type { PathLike } from "fs";
import { readFile, writeFile } from "fs/promises";


export const handleIpcMain = () => {
  ipcMain.handle('file:open', openFile);
  ipcMain.handle("file:save", saveFile);
  ipcMain.handle("file:savetemp", saveTempFile);
};
export const save = () => {
  console.log("save");
};

export const saveFile = async (event: IpcMainInvokeEvent, file: FilePayload) => {
  console.log("saveFile", file);
  const { path, text } = file;
  console.log("save", path, text);
  if (file.path && file.text) {
    await writeFile(path as PathLike, text!);
  }
};

export const saveTempFile = async (e: IpcMainInvokeEvent, file: FilePayload) => {
  const tempPath = app.getPath("downloads");
  console.log("tempPath", tempPath);
  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath: tempPath + "/" + file.name,
  });
  if (!canceled && filePath && file.text) {
    writeFile(filePath, file.text);
  }
};

export const openFile = async (event: IpcMainInvokeEvent, file: FilePayload) => {
  try {
    const result = await readFile(file.path!, "utf-8");
    return result;
  } catch (error) {
    dialog.showMessageBox({ message: "Cannot open file", type: "error" });
    throw new Error("Cannot open file");
  }
};
