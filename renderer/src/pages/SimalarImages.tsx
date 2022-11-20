import { Image } from "@common/models/Image";
// import { Toolbar } from "@renderer/components/Toolbar";
import { useNavigate } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import { Gallery } from "../components/Gallery/Gallery";
import { useAppStore } from "../store/AppStore";

const SimilarImagesPage: Component = () => {
  const [state, { getSimilarImages }] = useAppStore();
  const [selectedImages, setSelectedImages] = createSignal<Image[]>([]);
  const navigate = useNavigate();

  if (state.selectedSimilarGroupId == null) {
    return <div>エラーが発生しました。類似画像が存在しません。</div>;
  }

  return (
    <>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        戻る
      </button>
      {/* <Toolbar
        images={selectedImages()}
        visible={{
          load: false,
          group: false,
          remove: true,
        }}
      /> */}
      <Gallery
        images={getSimilarImages(state.selectedSimilarGroupId)}
        onSelect={setSelectedImages}
      />
    </>
  );
};

export default SimilarImagesPage;
