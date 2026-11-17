import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/styles/fonts.css';
import '@/styles/index.css';
import App from '@/App';
import { isPrerender, setBootFromHtml } from '@/utils/boot';
import { initAnalytics } from '@/services/analytics';

// Kept from the original app so future API-backed features can use React Query.
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false } },
});

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

if (!isPrerender() && container.hasChildNodes()) {
  // Pre-rendered page: attach React to the existing HTML instead of replacing it, so content that
  // is already painted stays on screen (fast LCP, no flash). Components render their first frame
  // exactly as in the saved HTML and only then apply live state (see utils/boot.js).
  setBootFromHtml(true);
  ReactDOM.hydrateRoot(container, app, {
    onRecoverableError: (err) => console.warn('[hydrate]', err && err.message),
  });
} else {
  ReactDOM.createRoot(container).render(app);
}

if (!isPrerender()) initAnalytics();
