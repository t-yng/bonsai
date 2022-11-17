import { Image } from "@common/models/Image";
import { Component, For } from "solid-js";
import styles from "./ImageGroup.module.css";

type ImageGroupProps = {
  images: Image[];
  onClick?: (images: Image[]) => void;
};

const SHIFT_BASE = 8;

export const ImageGroup: Component<ImageGroupProps> = ({ images, onClick }) => {
  return (
    <div
      class={styles.imageGroup}
      onClick={() => {
        onClick?.(images);
      }}
    >
      <For each={images}>
        {(image, i) => {
          const shift = SHIFT_BASE * i();
          return (
            <img
              src={`data:image/jpg;base64,${image.base64}`}
              style={{ top: `${shift}px`, left: `${shift}px` }}
              class={styles.image}
            />
          );
        }}
      </For>
    </div>
  );
};
