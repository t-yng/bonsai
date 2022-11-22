import { StoredImage, useAppStore } from "@renderer/store/AppStore";
import { useNavigate } from "@solidjs/router";
import { Component, For } from "solid-js";
import { ImageGroup } from "../ImageGroup";
import styles from "./SimilarImageGallery.module.css";

type SimilarImageGalleryProps = {
  similarImageGroups: StoredImage[][];
};

export const SimilarImageGallery: Component<SimilarImageGalleryProps> = (
  props
) => {
  const [, { setSimilarImageGroup }] = useAppStore();
  const navigate = useNavigate();

  return (
    <div class={styles.root}>
      <For each={props.similarImageGroups}>
        {(images) => (
          <ImageGroup
            groupId={images[0].similarGroupId as string}
            images={images}
            onClick={(groupId) => {
              setSimilarImageGroup(groupId);
              navigate("/image-group");
            }}
          />
        )}
      </For>
    </div>
  );
};
