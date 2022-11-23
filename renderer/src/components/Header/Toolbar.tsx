import { Component, useContext } from "solid-js";
import { ToolbarContext, useToolbar } from "@renderer/hooks/useToolbar";
import { Button } from "../Button";
import styles from "./Toolbar.module.css";
import RoundedAdd from "~icons/material-symbols/add-rounded";
import Delete from "~icons/material-symbols/delete-outline-rounded";

export type FeatureVisible = Partial<{
  load: boolean;
  remove: boolean;
  group: boolean;
}>;

export const Toolbar: Component = () => {
  const [
    state,
    {
      loadImages,
      removeImages,
      groupSimilarImages,
      unGroupSimilarImages,
      setGrouped,
    },
  ] = useToolbar();

  const handleClickGroup = () => {
    if (state.grouped) {
      unGroupSimilarImages();
    } else {
      groupSimilarImages();
    }
    setGrouped(!state.grouped);
  };

  return (
    <div class={styles.toolbar}>
      <div class={styles.targetActionWrapper}>
        {state.visible.group && (
          <Button
            variant={state.grouped ? "primary" : "outline"}
            onClick={handleClickGroup}
          >
            類似画像をまとめる
          </Button>
        )}
        {state.visible.remove && (
          <Button icon={Delete} onClick={() => removeImages()}>
            削除
          </Button>
        )}
      </div>
      {state.visible.load && (
        <Button icon={RoundedAdd} onClick={() => loadImages()}>
          画像読み込む
        </Button>
      )}
    </div>
  );
};
