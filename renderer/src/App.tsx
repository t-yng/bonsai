import { Route, Routes } from "@solidjs/router";
import { Component, lazy } from "solid-js";
import { AppStoreProvider, useAppStore } from "./store/AppStore";
const Home = lazy(() => import("./pages/Home"));
const ImageGroup = lazy(() => import("./pages/ImageGroup"));

const App: Component = () => {
  return (
    <AppStoreProvider>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/image-group" component={ImageGroup} />
      </Routes>
    </AppStoreProvider>
  );
};

export default App;
