import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';

const container = document.getElementById('root')!;

const tree = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

const onCaughtError = (error: unknown, errorInfo: { componentStack?: string | null }) => {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  console.error(error, errorInfo.componentStack);
};

// Routes are prerendered to static HTML at build time, so in production the
// container already holds markup and we hydrate over it. In dev it is empty.
if (container.firstElementChild) {
  hydrateRoot(container, tree, { onCaughtError });
} else {
  createRoot(container, { onCaughtError }).render(tree);
}
