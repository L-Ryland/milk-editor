import { app, type BrowserWindow, type MenuItemConstructorOptions } from "electron";

export const menuTemplate: (mainWindow: BrowserWindow) => MenuItemConstructorOptions[] = (mainWindow) => [
  {
    label: "App", submenu: [
      { type: 'separator' },
      { label: 'Exit', click() { console.log('Exit app');; app.quit(); }, accelerator: 'CmdOrCtrl+Q' },
    ]
  },
  {
    label: 'File',
    submenu: [
      { label: 'New', click() { console.log('New File'); }, accelerator: 'CmdOrCtrl+N' },
      { label: 'Open', click() { console.log('Open File'); }, accelerator: 'CmdOrCtrl+O' },
      {
        label: 'Save', click() {
          mainWindow.webContents.send("call:fileSave");
          console.log('Save File');
        }, accelerator: 'CmdOrCtrl+S'
      },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Undo', role: 'undo' },
      { label: 'Redo', role: 'redo' },
      { type: 'separator' },
      { label: 'Cut', role: 'cut', },
      { label: 'Copy', role: 'copy' },
      { label: 'Paste', role: 'paste' },
    ],
  },
  {
    label: 'Help',
    submenu: [
      { label: 'About', click() { console.log('About'); } },
    ],
  },
];
