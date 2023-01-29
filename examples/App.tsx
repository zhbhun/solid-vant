import { createMemo, lazy } from 'solid-js';
import { type Component } from 'solid-js';
import { Routes, Route } from 'solid-app-router';

function LazyRoute(props: {
  path: string;
  component: ReturnType<typeof lazy>;
}) {
  const element = createMemo(() => {
    const { component: Comp } = props;
    return <Comp />;
  });
  return <Route path={props.path} element={element} />;
}

const App: Component = () => {
  return (
    <Routes>
      <LazyRoute
        path="/badge"
        component={lazy(() => import('./pages/badge'))}
      />
      <LazyRoute
        path="/button"
        component={lazy(() => import('./pages/button'))}
      />
      <LazyRoute path="/cell" component={lazy(() => import('./pages/cell'))} />
      <LazyRoute
        path="/config-provider"
        component={lazy(() => import('./pages/config-provider'))}
      />
      <LazyRoute path="/col" component={lazy(() => import('./pages/col'))} />
      <LazyRoute path="/icon" component={lazy(() => import('./pages/icon'))} />
      <LazyRoute
        path="/image"
        component={lazy(() => import('./pages/image'))}
      />
      <LazyRoute
        path="/layout"
        component={lazy(() => import('./pages/layout'))}
      />
      <LazyRoute
        path="/loading"
        component={lazy(() => import('./pages/loading'))}
      />
      <LazyRoute
        path="/overlay"
        component={lazy(() => import('./pages/overlay'))}
      />
      <LazyRoute
        path="/popup"
        component={lazy(() => import('./pages/popup'))}
      />
      <LazyRoute path="/rate" component={lazy(() => import('./pages/rate'))} />
      <LazyRoute path="/space" component={lazy(() => import('./pages/space'))} />
      <LazyRoute
        path="/style"
        component={lazy(() => import('./pages/style'))}
      />
      <LazyRoute
        path="/switch"
        component={lazy(() => import('./pages/switch'))}
      />
      <LazyRoute
        path="/toast"
        component={lazy(() => import('./pages/toast'))}
      />
    </Routes>
  );
};

export default App;
