import { Image } from "@common/models/Image";

declare global {
  interface Window {
    ipc: {
      loadImages: () => Promise<Image[]>;
      removeImages: (filePaths: string[]) => Promise<void>;
      groupSimilarImages: () => Promise<Image[][]>;
    };
  }
}
