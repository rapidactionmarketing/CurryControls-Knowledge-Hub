import { Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { MobileCallBar } from '@/components/layout/mobile-call-bar';
import { NoticeGate } from '@/components/layout/notice-gate';
import { AnalyticsTracker } from '@/components/analytics-tracker';
import { ScrollToTop, Shell } from '@/ssr-shell';

const queryClient = new QueryClient();

/**
 * `ssrPath` is supplied only by the prerender step. The component tree is
 * otherwise identical on the server and the client, which is what keeps
 * hydration clean: a tree that differs even by a null-rendering sibling
 * shifts React's useId counters and produces a mismatch.
 */
export default function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter ssrPath={ssrPath}>
          <ScrollToTop />
          <AnalyticsTracker />
          <NoticeGate />
          <Shell />
          <MobileCallBar />
          <Toaster />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
