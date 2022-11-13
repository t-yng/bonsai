import { contextBridge, ipcRenderer } from "electron";
import { Image } from "@common/models/Image";

contextBridge.exposeInMainWorld("ipc", {
  loadImages: async (): Promise<Image[]> => {
    const images = (await ipcRenderer.invoke("loadImages")) as Image[];
    return images;
  },
  removeImages: (filePaths: string[]) => {
    return ipcRenderer.invoke("removeImages", filePaths);
  },
  groupSimilarImages: () => {
    return ipcRenderer.invoke("groupSimilarImages");
  },
});
