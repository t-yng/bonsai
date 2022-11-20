import { Image } from "@common/models/Image";
import { Component, createContext, ParentProps, useContext } from "solid-js";
import { createStore } from "solid-js/store";

type SimilarImageGroupId = string;

export type StoredImage = Image & {
  similarGroupId?: SimilarImageGroupId;
};

type StoreState = {
  images: StoredImage[];
  selectedSimilarGroupId: SimilarImageGroupId | null;
};

type StoreDispatcher = {
  setImages: (images: Image[]) => void;
  setSimilarImageGroup: (groupId: SimilarImageGroupId) => void;
  getSimilarImages: (groupId: string) => StoredImage[];
  getSimilarImageGroups: () => StoredImage[][];
};

export const AppStoreContext = createContext<[StoreState, StoreDispatcher]>([
  { images: [], selectedSimilarGroupId: null },
  {
    setImages: () => {},
    setSimilarImageGroup: () => {},
    getSimilarImages: () => [],
    getSimilarImageGroups: () => [],
  },
]);

export const AppStoreProvider: Component<ParentProps> = (props) => {
  const [state, setState] = createStore<StoreState>({
    images: [],
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
