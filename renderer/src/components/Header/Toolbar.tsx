import { Component, createSignal } from "solid-js";
import { Image } from "@common/models/Image";
import { StoredImage } from "@renderer/store/AppStore";
import { useToolbar } from "@renderer/hooks/useToolbar";
import { Button } from "../Button";
import styles from "./Toolbar.module.css";
import RoundedAdd from "~icons/material-symbols/add-rounded";
import Delete from "~icons/material-symbols/delete-outline-rounded";

export type FeatureVisible = Partial<{
  load: boolean;
  remove: boolean;
  group: boolean;
}>;

type ToolbarProps = {
  images?: Image[];
  onLoadImages?: (images: Image[]) => void;
  onRemoveImages?: (removedImages: Image[]) => void;
  onGroupSimilarImages?: (images: StoredImage[]) => void;
};

export const Toolbar: Component<ToolbarProps> = (props) => {
  const [groupedImage, setGroupedImage] = createSignal();
  const {
    loadImages,
    removeImages,
    groupSimilarImages,
    unGroupSimilarImages,
    visible,
  } = useToolbar();

  return (
    <div class={styles.toolbar}>
      <div class={styles.targetActionWrapper}>
        {visible.group && (
          <Button
            variant={groupedImage() ? "primary" : "outline"}
            onClick={() => {
              if (groupedImage()) {
                unGroupSimilarImages();
              } else {
                groupSimilarImages();
              }
              setGroupedImage((grouped) => !grouped);
            }}
          >
            類似画像をまとめる
          </Button>
        )}
        {visible.remove && (
          <Button icon={Delete} onClick={() => removeImages()}>
            削除
          </Button>
        )}
      </div>
      {visible.load && (
        <Button icon={RoundedAdd} onClick={() => loadImages()}>
          画像読み込む
        </Button>
      )}
    </div>
  );
};
