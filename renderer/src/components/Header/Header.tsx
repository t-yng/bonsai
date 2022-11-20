import styles from "./Header.module.css";
import { Toolbar } from "./Toolbar";

export const Header = () => {
  return (
    <header class={styles.header}>
      <Toolbar />
    </header>
  );
};
