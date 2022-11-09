import { app, BrowserWindow } from "electron";
import electronReload from "electron-reload";
import path from "path";

electronReload(__dirname, {
  electron: path.join(__dirname, "..", "node_modules", ".bin", "electron"),
  hardResetMethod: "exit",
});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 400,
  });

  win.loadFile(path.join(__dirname, "index.html"));
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  createWindow();
});
