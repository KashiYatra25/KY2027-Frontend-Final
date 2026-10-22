import { Loader2 } from "lucide-react";

export function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950">
      <div className="text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-amber-400" />
        <p className="mt-4 text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
