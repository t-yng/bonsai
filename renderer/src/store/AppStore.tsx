import { Image } from "@common/models/Image";
import {
  Component,
  createContext,
  ParentProps,
  useContext,
  VoidProps,
} from "solid-js";
import { createStore } from "solid-js/store";

type StoreState = {
  imageGroup: Image[];
};

type StoreDispatcher = {
  setImageGroup: (imageGroup: Image[]) => void;
};

export const AppStoreContext = createContext<[StoreState, StoreDispatcher]>([
  { imageGroup: [] },
  {
    setImageGroup: () => {},
  },
]);

export const AppStoreProvider: Component<ParentProps> = (props) => {
  const [state, setState] = createStore<StoreState>({ imageGroup: [] });
  const store: [StoreState, StoreDispatcher] = [
    state,
    {
      setImageGroup: (imageGroup: Image[]) => {
        setState("imageGroup", imageGroup);
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
