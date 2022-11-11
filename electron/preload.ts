import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipc", {
  loadImages: async () => {
    const images = await ipcRenderer.invoke("loadImages");
    return images;
  },
});
