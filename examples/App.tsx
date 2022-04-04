import { lazy } from 'solid-js';
import { type Component } from 'solid-js';
import { Routes, Route } from 'solid-app-router';

const BadgeExample = lazy(() => import('./pages/badge'));
const ButtonExample = lazy(() => import('./pages/button'));
const CellExample = lazy(() => import('./pages/cell'));
const ConfigProviderExample = lazy(() => import('./pages/config-provider'));
const ColExample = lazy(() => import('./pages/col'));
const IconExample = lazy(() => import('./pages/icon'));
const LoadingExample = lazy(() => import('./pages/loading'));
const ImageExample = lazy(() => import('./pages/image'));
const OverlayExample = lazy(() => import('./pages/overlay'));
const PopupExample = lazy(() => import('./pages/popup'));
const StyleExample = lazy(() => import('./pages/style'));
const SwitchExample = lazy(() => import('./pages/switch'));
const ToastExample = lazy(() => import('./pages/toast'));

const App: Component = () => {
  return (
    <Routes>
      <Route path="/badge" element={<BadgeExample />} />
      <Route path="/button" element={<ButtonExample />} />
      <Route path="/cell" element={<CellExample />} />
      <Route path="/config-provider" element={<ConfigProviderExample />} />
      <Route path="/col" element={<ColExample />} />
      <Route path="/icon" element={<IconExample />} />
      <Route path="/image" element={<ImageExample />} />
      <Route path="/loading" element={<LoadingExample />} />
      <Route path="/overlay" element={<OverlayExample />} />
      <Route path="/popup" element={<PopupExample />} />
      <Route path="/style" element={<StyleExample />} />
      <Route path="/switch" element={<SwitchExample />} />
      <Route path="/toast" element={<ToastExample />} />
    </Routes>
  );
};

export default App;
