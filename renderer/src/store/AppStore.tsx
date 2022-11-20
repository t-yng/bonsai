import { Image } from "@common/models/Image";
import { Component, createContext, ParentProps, useContext } from "solid-js";
import { createStore } from "solid-js/store";

type SimilarImageGroupId = string;

export type StoredImage = Image & {
  similarGroupId?: SimilarImageGroupId;
};

type StoreState = {
  images: StoredImage[];
  selectedImages: StoredImage[];
  selectedSimilarGroupId: SimilarImageGroupId | null;
};

type StoreDispatcher = {
  setImages: (images: Image[]) => void;
  setSimilarImageGroup: (groupId: SimilarImageGroupId) => void;
  selectImage: (image: StoredImage) => void;
  unSelectImage: (image: StoredImage) => void;
  getSimilarImages: (groupId: string) => StoredImage[];
  getSimilarImageGroups: () => StoredImage[][];
};

export const AppStoreContext = createContext<[StoreState, StoreDispatcher]>([
  { images: [], selectedImages: [], selectedSimilarGroupId: null },
  {
    setImages: () => {},
    selectImage: () => {},
    unSelectImage: () => {},
    setSimilarImageGroup: () => {},
    getSimilarImages: () => [],
    getSimilarImageGroups: () => [],
  },
]);

export const AppStoreProvider: Component<ParentProps> = (props) => {
  const [state, setState] = createStore<StoreState>({
    images: [],
    selectedImages: [],
    selectedSimilarGroupId: null,
  });

  const store: [StoreState, StoreDispatcher] = [
    state,
    {
      setImages: (images: Image[]) => {
        setState("images", images);
      },
      setSimilarImageGroup(groupId) {
        setState("selectedSimilarGroupId", groupId);
      },
      selectImage(image) {
        const notExists =
          state.selectedImages.find((img) => img.filePath === image.filePath) ==
          null;
        if (notExists) {
          setState("selectedImages", [...state.selectedImages, image]);
        }
      },
      unSelectImage(image) {
        const targetIndex = state.selectedImages.findIndex(
          (img) => img.filePath === image.filePath
        );
        if (targetIndex) {
          setState("selectedImages", [
            ...state.selectedImages.splice(targetIndex, 1),
          ]);
        }
      },
      getSimilarImages(groupId: string) {
        return state.images.filter((image) => image.similarGroupId === groupId);
      },
      getSimilarImageGroups() {
        const groups: StoredImage[][] = [];
        for (const image of state.images) {
          if (image.similarGroupId == null) continue;
          const group = groups.find((group) => {
            return group[0]?.similarGroupId === image.similarGroupId;
          });
          if (group != null) {
            group.push(image);
          } else {
            groups.push([image]);
          }
        }
        return groups;
      },
    },
  ];

  return (
    <AppStoreContext.Provider value={store}>
      {props.children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = () => {
  return useContext(AppStoreContext);
};
