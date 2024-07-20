import { app, ipcMain, type BrowserWindow, type IpcMainEvent } from "electron";
import pino from "pino";

const logger = pino({ level: "info", name: "AppHandler" });
export default class AppHandler {
  #mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.#mainWindow = mainWindow;
    logger.info(mainWindow);
    this.init();
  }

  init() {
    ipcMain.on("set#app-title", this.setAppTitle);
  }

  setAppTitle(_e: IpcMainEvent, title: string) {
    if (title && typeof title === "string") {
      // this.#mainWindow.setTitle(title);
      app.setName(title);
    }
  }
}
