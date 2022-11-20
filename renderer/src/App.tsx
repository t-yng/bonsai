import { Route, Routes } from "@solidjs/router";
import { Component, lazy } from "solid-js";
import { ToolbarProvider } from "./hooks/useToolbar";
import { AppStoreProvider } from "./store/AppStore";
const Home = lazy(() => import("./pages/Home"));
const SimilarImages = lazy(() => import("./pages/SimalarImages"));

const App: Component = () => {
  return (
    <AppStoreProvider>
      <ToolbarProvider>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/image-group" component={SimilarImages} />
        </Routes>
      </ToolbarProvider>
    </AppStoreProvider>
  );
};

export default App;
