import { Image } from "@common/models/Image";
import { StoredImage, useAppStore } from "@renderer/store/AppStore";
import {
  Component,
  ComponentProps,
  createContext,
  createUniqueId,
  ParentProps,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";

type ActionVisible = {
  group?: boolean;
  remove?: boolean;
  load?: boolean;
};

type ToolbarState = {
  visible: ActionVisible;
};

type Dispatcher = {
  setVisible: (visible: ActionVisible) => void;
};

const ToolbarContext = createContext<[ToolbarState, Dispatcher]>([
  {
    visible: {},
  },
  {
    setVisible: () => {},
  },
]);

export const ToolbarProvider: Component<ParentProps> = (props) => {
  const [state, setState] = createStore<ToolbarState>({
    visible: {
      group: true,
      remove: true,
      load: true,
    },
  });

  const value: [ToolbarState, Dispatcher] = [
    state,
    {
      setVisible(visible) {
        setState("visible", { ...state.visible, ...visible });
      },
    },
  ];

  return (
    <ToolbarContext.Provider value={value}>
      {props.children}
    </ToolbarContext.Provider>
  );
};

export const useToolbar = () => {
  const [toolbarState, { setVisible }] = useContext(ToolbarContext);
  const [appState, { setImages }] = useAppStore();

  const loadImages = async (onLoad?: (images: Image[]) => void) => {
    const images = await window.ipc.loadImages();
    setImages(images);
    onLoad?.(images);
  };

  const removeImages = async (onRemove?: (images: Image[]) => void) => {
    console.log("remove images");
    console.log(appState.selectedImages);
    if (!appState.selectedImages) return;
    const removedFilePaths = appState.selectedImages.map((img) => img.filePath);
    await window.ipc.removeImages(removedFilePaths);
    setImages([
      ...appState.images.filter(
        (image) => !removedFilePaths.includes(image.filePath)
      ),
    ]);
    onRemove?.(appState.selectedImages);
  };

  const groupSimilarImages = async (
    onGroup?: (images: StoredImage[]) => void
  ) => {
    const groups = await window.ipc.groupSimilarImages();

    const groupedImages: StoredImage[] = [];
    for (const images of groups) {
      const similarGroupId = createUniqueId();
      for (const image of images) {
        groupedImages.push({
          ...image,
          similarGroupId: similarGroupId,
        });
      }
    }
    setImages([...groupedImages]);
    onGroup?.(groupedImages);
  };

  return {
    loadImages,
    removeImages,
    groupSimilarImages,
    ...toolbarState,
    setVisible,
  };
};
