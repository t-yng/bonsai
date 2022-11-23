import { Image } from "@common/models/Image";
import { StoredImage, useAppStore } from "@renderer/store/AppStore";
import {
  Component,
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
  grouped: boolean;
};

type Dispatcher = {
  setVisible: (visible: ActionVisible) => void;
  setGrouped: (grouped: boolean) => void;
};

export const ToolbarContext = createContext<[ToolbarState, Dispatcher]>([
  {
    visible: {},
    grouped: false,
  },
  {
    setVisible: () => {},
    setGrouped: () => {},
  },
]);

export const ToolbarProvider: Component<ParentProps> = (props) => {
  const [state, setState] = createStore<ToolbarState>({
    visible: {
      group: true,
      remove: true,
      load: true,
    },
    grouped: false,
  });

  const value: [ToolbarState, Dispatcher] = [
    state,
    {
      setVisible(visible) {
        setState("visible", { ...state.visible, ...visible });
      },
      setGrouped(grouped) {
        setState("grouped", grouped);
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
  const [toolbarState, toolbarDispatcher] = useContext(ToolbarContext);
  const [appState, { setImages, unSelectImageAll }] = useAppStore();

  const loadImages = async (onLoad?: (images: Image[]) => void) => {
    const images = await window.ipc.loadImages();
    setImages(images);
    onLoad?.(images);
  };

  const removeImages = async (onRemove?: (images: Image[]) => void) => {
    if (!appState.selectedImages) return;
    const removedFilePaths = appState.selectedImages.map((img) => img.filePath);
    await window.ipc.removeImages(removedFilePaths);
    const restImages = appState.images.filter(
      (image) => !removedFilePaths.includes(image.filePath)
    );
    setImages([...restImages]);
    onRemove?.([...appState.selectedImages]);
    unSelectImageAll();
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

  const unGroupSimilarImages = () => {
    const unGroupedImages = appState.images.map((image) => {
      return {
        ...image,
        similarGroupId: null,
      };
    });
    setImages([...unGroupedImages]);
  };

  return [
    toolbarState,
    {
      loadImages,
      removeImages,
      groupSimilarImages,
      unGroupSimilarImages,
      ...toolbarDispatcher,
    },
  ] as const;
};
