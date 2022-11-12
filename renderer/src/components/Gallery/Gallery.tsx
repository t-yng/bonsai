import { Image as ImageModel } from "@common/models/Image";
import { Component, For } from "solid-js";
import { Image } from "../Image";
import styles from "./Gallery.module.css";

type GalleryProps = {
  images: ImageModel[];
  onSelect?: (image: ImageModel, selected: boolean) => void;
};

export const Gallery: Component<GalleryProps> = (props) => {
  return (
    <div class={styles.gallery}>
      <For each={props.images}>
        {(image) => (
          <Image
            src={`data:image/jpg;base64,${image.base64}`}
            class={styles.image}
            onSelect={(selected: boolean) => {
              props.onSelect?.(image, selected);
            }}
          />
        )}
      </For>
    </div>
  );
};
