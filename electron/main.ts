import { app, BrowserWindow, dialog, ipcMain } from "electron";
import electronReload from "electron-reload";
import path from "path";
import fs from "fs";

electronReload(__dirname, {
  electron: path.join(__dirname, "..", "node_modules", ".bin", "electron"),
  hardResetMethod: "exit",
});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "index.html"));
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  ipcMain.handle("loadImages", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile", "multiSelections"],
      filters: [{ name: "Images", extensions: ["png", "jpg", "jpeg"] }],
    });

    return result.filePaths.map((filePath) => {
      return fs.readFileSync(filePath).toString("base64");
    });
  });

  createWindow();
});
