import { Component, For } from "solid-js";
import styles from "./Gallery.module.css";

type GalleryProps = {
  images: string[];
};

export const Gallery: Component<GalleryProps> = (props) => {
  return (
    <div class={styles.gallery}>
      <For each={props.images}>
        {(image) => (
          <img src={`data:image/jpg;base64,${image}`} class={styles.image} />
        )}
      </For>
    </div>
  );
};
