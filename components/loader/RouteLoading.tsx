import { DiyaSpinner } from "./DiyaSpinner";

/**
 * RouteLoading - full-screen Suspense fallback for App Router `loading.tsx`.
 *
 * Renders the SAME DiyaSpinner the global PageLoader uses, centered on the
 * app's dark background. Shown instantly on navigation while the destination
 * server component streams in. Purely presentational.
 */
export function RouteLoading() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(10, 10, 18, 0.6)", backdropFilter: "blur(12px)" }}
    >
      <DiyaSpinner />
    </div>
  );
}
