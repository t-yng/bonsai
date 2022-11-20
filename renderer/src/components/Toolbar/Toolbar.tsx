import { Image } from "@common/models/Image";
import { StoredImage, useAppStore } from "@renderer/store/AppStore";
import { Component, createUniqueId, mergeProps } from "solid-js";

type FeatureVisible = Partial<{
  load: boolean;
  remove: boolean;
  group: boolean;
}>;

type ToolbarProps = {
  images?: Image[];
  onLoadImages?: (images: Image[]) => void;
  onRemoveImages?: (removedImages: Image[]) => void;
  onGroupSimilarImages?: (images: StoredImage[]) => void;
  visible?: FeatureVisible;
};

export const Toolbar: Component<ToolbarProps> = (_props) => {
  const props = mergeProps<ToolbarProps[]>(
    { visible: { load: true, remove: true, group: true } },
    _props
  );
  const [state, { setImages }] = useAppStore();

  const loadImages = async () => {
    const images = await window.ipc.loadImages();
    setImages(images);
    props.onLoadImages?.(images);
  };

  const removeImages = async () => {
    if (!props.images) return;
    const removedFilePaths = props.images.map((img) => img.filePath);
    await window.ipc.removeImages(removedFilePaths);
    setImages([
      ...state.images.filter(
        (image) => !removedFilePaths.includes(image.filePath)
      ),
    ]);
    props.onRemoveImages?.(props.images);
  };

  const groupSimilarImages = async () => {
    const groups = await window.ipc.groupSimilarImages();

    const groupedImages: StoredImage[] = [];
    for (const images of groups) {
      const similarGroupId = createUniqueId();
      for (const image of images) {
        groupedImages.push({
          ...image,
          similarGroupId: similarGroupId,
        });
      }
    }
    setImages([...groupedImages]);
    props.onGroupSimilarImages?.(groupedImages);
  };

  return (
    <div>
      {props.visible?.load && (
        <button onClick={loadImages}>画像読み込み</button>
      )}
      {props.visible?.remove && (
        <button onClick={removeImages} disabled={!props.images}>
          削除
        </button>
      )}
      {props.visible?.group && (
        <button onClick={groupSimilarImages}>類似画像をまとめる</button>
      )}
    </div>
  );
};
