import { app, BrowserWindow, dialog, ipcMain } from "electron";
import electronReload from "electron-reload";
import path from "path";
import fs from "fs";
import { Image } from "@common/models/Image";
import { groupSimilarImages } from "./groupImages";

electronReload(__dirname, {
  electron: path.join(
    __dirname,
    "..",
    "..",
    "node_modules",
    ".bin",
    "electron"
  ),
  hardResetMethod: "exit",
});

const createWindow = () => {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.maximize();
  win.loadFile(path.join(__dirname, "..", "index.html"));
  win.show();
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  let images: Image[] = [];

  ipcMain.handle("loadImages", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile", "multiSelections"],
      filters: [{ name: "Images", extensions: ["png", "jpg", "jpeg"] }],
    });

    images = result.filePaths.map<Image>((filePath) => {
      return {
        filePath,
        base64: fs.readFileSync(filePath).toString("base64"),
      };
    });

    return images;
  });

  ipcMain.handle("removeImages", (_event, filePaths: string[]) => {
    for (const filePath of filePaths) {
      const target = images.find((image) => filePath === image.filePath);
      if (target) {
        fs.unlinkSync(target.filePath);
      }
    }
  });

  ipcMain.handle("groupSimilarImages", () => {
    return groupSimilarImages(images);
  });

  createWindow();
});
