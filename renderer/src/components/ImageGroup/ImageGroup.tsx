import { Image } from "@common/models/Image";
import { Component, For } from "solid-js";
import styles from "./ImageGroup.module.css";

type ImageGroupProps = {
  groupId: string;
  images: Image[];
  onClick?: (groupId: string) => void;
};

const SHIFT_BASE = 8;

export const ImageGroup: Component<ImageGroupProps> = (props) => {
  return (
    <div
      class={styles.imageGroup}
      onClick={() => {
        props.onClick?.(props.groupId);
      }}
    >
      <For each={props.images}>
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
