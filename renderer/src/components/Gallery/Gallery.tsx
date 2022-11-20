import { Image as ImageModel } from "@common/models/Image";
import { Component, createSignal, For } from "solid-js";
import { Image } from "../Image";
import styles from "./Gallery.module.css";

type GalleryProps = {
  images: ImageModel[];
  onSelect?: (selectedImages: ImageModel[]) => void;
};

export const Gallery: Component<GalleryProps> = (props) => {
  const [selectedImages, setSelectedImages] = createSignal<ImageModel[]>([]);

  const handleSelect = (image: ImageModel, selected: boolean) => {
    let updatedImages = selectedImages();
    if (selected) {
      updatedImages = setSelectedImages([...selectedImages(), image]);
    } else {
      const images = selectedImages().filter(
        (selectedImage) => selectedImage.filePath !== image.filePath
      );
      updatedImages = setSelectedImages(images);
    }
    props.onSelect?.(updatedImages);
  };

  return (
    <div class={styles.gallery}>
      <For each={props.images}>
        {(image) => (
          <Image
            src={`data:image/jpg;base64,${image.base64}`}
            class={styles.image}
            onSelect={(selected: boolean) => {
              handleSelect(image, selected);
            }}
          />
        )}
      </For>
    </div>
  );
};
