import { Component, ParentProps } from "solid-js";
import styles from "./Main.module.css";

export const Main: Component<ParentProps> = (props) => {
  return <main class={styles.main}>{props.children}</main>;
};
