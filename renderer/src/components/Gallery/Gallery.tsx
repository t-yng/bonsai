import { useAppStore } from "@renderer/store/AppStore";
import { Component, For } from "solid-js";
import { Image } from "../Image";
import styles from "./Gallery.module.css";

type GalleryProps = {};

export const Gallery: Component<GalleryProps> = () => {
  const [state, { selectImage, unSelectImage }] = useAppStore();

  return (
    <div class={styles.gallery}>
      <For each={state.images}>
        {(image) => (
          <Image
            src={`data:image/jpg;base64,${image.base64}`}
            class={styles.image}
            onSelect={(selected: boolean) => {
              if (selected) {
                selectImage(image);
              } else {
                unSelectImage(image);
              }
            }}
          />
        )}
      </For>
    </div>
  );
};
