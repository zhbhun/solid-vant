import { lazy } from "solid-js";
import type { Component } from "solid-js";
import { Routes, Route } from "solid-app-router";

const ButtonExample = lazy(() => import("./pages/button"));

const App: Component = () => {
  return (
    <Routes>
      <Route path="/button" element={<ButtonExample />} />
    </Routes>
  );
};

export default App;
