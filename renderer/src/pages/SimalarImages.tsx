import { Image } from "@common/models/Image";
import { EmptyImage } from "@renderer/components/EmptyState";
import { Header, useToolbar } from "@renderer/components/Header";
import { useNavigate } from "@solidjs/router";
import { Component, createEffect, createSignal, Show } from "solid-js";
import { Gallery } from "../components/Gallery/Gallery";
import { useAppStore } from "../store/AppStore";

const SimilarImagesPage: Component = () => {
  const [state] = useAppStore();
  const [images, setImages] = createSignal<Image[]>([]);
  const { setVisible } = useToolbar();
  const navigate = useNavigate();

  setVisible({
    group: false,
    load: false,
    remove: true,
  });

  createEffect(() => {
    if (state.selectedSimilarGroupId == null) {
      setImages([]);
    } else {
      setImages(
        state.images.filter(
          (image) => image.similarGroupId === state.selectedSimilarGroupId
        )
      );
    }
  });

  return (
    <>
      <Header />
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        戻る
      </button>
      <Show when={images().length > 0} fallback={<EmptyImage />}>
        <Gallery images={images()} />
      </Show>
    </>
  );
};

export default SimilarImagesPage;
