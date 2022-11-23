import { Image } from "@common/models/Image";
import { EmptyImage } from "@renderer/components/EmptyState";
import { Header, useToolbar } from "@renderer/components/Header";
import { useNavigate } from "@solidjs/router";
import { Component, createEffect, createSignal, Show } from "solid-js";
import { Gallery } from "../components/Gallery/Gallery";
import { useAppStore } from "../store/AppStore";
import ArrowBackRounded from "~icons/material-symbols/arrow-back-rounded";
import { Main } from "@renderer/components/Main";
import styles from "./SimilarImages.module.css";

const SimilarImagesPage: Component = () => {
  const [state] = useAppStore();
  const [images, setImages] = createSignal<Image[]>([]);
  const [, { setVisible }] = useToolbar();
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
      <Main>
        <section aria-labelledby="section-title">
          <div class={styles.titleBlock}>
            <a
              href="/"
              onClick={(event) => {
                event.preventDefault();
                navigate("/");
              }}
              class={styles.backLink}
            >
              <ArrowBackRounded
                aria-label="画像一覧へ戻る"
                class={styles.arrowBackIcon}
              />
            </a>
            <h1 id="section-title">類似画像</h1>
          </div>
          <Show when={images().length > 0} fallback={<EmptyImage />}>
            <Gallery images={images()} />
          </Show>
        </section>
      </Main>
    </>
  );
};

export default SimilarImagesPage;
