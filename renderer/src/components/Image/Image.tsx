import { Component, createSignal, splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import styles from "./Image.module.css";

type ImageProps = Omit<JSX.ImgHTMLAttributes<HTMLImageElement>, "onSelect"> & {
  onSelect?: (selected: boolean) => void;
};

export const Image: Component<ImageProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "onSelect"]);
  const [selected, setSelected] = createSignal(false);

  const clickSelection = () => {
    const selected = setSelected((selected) => !selected);
    local.onSelect?.(selected);
  };

  return (
    <div
      class={`${[styles.imageWrapper, local.class].join(" ")}`}
      classList={{ [styles.selected]: selected() }}
    >
      <img {...others} class={styles.image} />
      <div class={styles.selection} onClick={clickSelection} />
      <div class={styles.overlay} />
    </div>
  );
};
