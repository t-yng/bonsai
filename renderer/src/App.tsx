import { Component, createSignal, For } from "solid-js";
import { Gallery } from "./components/Gallery/Gallery";
import { ImageGroup } from "./components/ImageGroup";

const dummyImages = [
  "https://placehold.jp/ff00c8/ffffff/150x150.png",
  "https://placehold.jp/2b00ff/ffffff/150x150.png",
  "https://placehold.jp/c800ff/ffffff/150x150.png",
  "https://placehold.jp/00b825/ffffff/150x150.png",
  "https://placehold.jp/b4cc00/ffffff/150x150.png",
];

const App: Component = () => {
  const [images, setImages] = createSignal<string[]>([]);

  const loadImages = async () => {
    const images = await (window as any).ipc.loadImages();
    setImages(images);
  };

  return (
    <>
      <button onClick={loadImages}>画像読み込み</button>
      <Gallery images={images()} />
      {/* <div style={{ display: "flex", gap: 24 + "px", "flex-wrap": "wrap" }}>
        <ImageGroup images={dummyImages} />
        <ImageGroup images={dummyImages} />
        <ImageGroup images={dummyImages} />
        <ImageGroup images={dummyImages} />
        <ImageGroup images={dummyImages} />
        <ImageGroup images={dummyImages} />
      </div> */}
    </>
  );
};

export default App;
