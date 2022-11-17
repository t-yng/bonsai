import { Component } from "solid-js";
import { Gallery } from "../components/Gallery/Gallery";
import { useAppStore } from "../store/AppStore";

const ImageGroupPage: Component = () => {
  const [state] = useAppStore();

  return <Gallery images={state.imageGroup} />;
};

export default ImageGroupPage;
