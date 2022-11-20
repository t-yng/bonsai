import ImageSearchSharp from "~icons/material-symbols/image-search-sharp";
import styles from "./EmptyState.module.css";

export const EmptyImage = () => {
  return (
    <div class={styles.emptyState}>
      <ImageSearchSharp style={{ width: "180px", height: "180px" }} />
      <span class={styles.text}>画像がありません</span>
    </div>
  );
};
