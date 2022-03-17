import { lazy } from "solid-js";
import type { Component } from "solid-js";
import { Routes, Route } from "solid-app-router";

const BadgeExample = lazy(() => import("./pages/badge"));
const ButtonExample = lazy(() => import("./pages/button"));
const ConfigProviderExample = lazy(() => import("./pages/config-provider"));
const ColExample = lazy(() => import("./pages/col"));
const IconExample = lazy(() => import("./pages/icon"));
const ImageExample = lazy(() => import("./pages/image"));
const StyleExample = lazy(() => import("./pages/style"));

const App: Component = () => {
  return (
    <Routes>
      <Route path="/badge" element={<BadgeExample />} />
      <Route path="/button" element={<ButtonExample />} />
      <Route path="/config-provider" element={<ConfigProviderExample />} />
      <Route path="/col" element={<ColExample />} />
      <Route path="/icon" element={<IconExample />} />
      <Route path="/image" element={<ImageExample />} />
      <Route path="/style" element={<StyleExample />} />
    </Routes>
  );
};

export default App;
