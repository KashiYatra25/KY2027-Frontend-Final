"use client";

import { useApolloClient } from "@apollo/client/react";
import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Full-featured In-app Apollo DevTools
 *
 * Toggle with Ctrl+Shift+A (or Cmd+Shift+A on Mac)
 * Only renders in development mode
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

interface CacheEntry {
  key: string;
  typename: string;
  data: AnyData;
}

interface OperationLog {
  id: number;
  type: "query" | "mutation";
  name: string;
  variables: AnyData;
  timestamp: number;
  duration?: number;
  status: "pending" | "success" | "error";
  data?: AnyData;
  error?: string;
}

type Tab = "cache" | "operations" | "settings";

export function ApolloDevTools() {
  const client = useApolloClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("cache");
  const [cacheEntries, setCacheEntries] = useState<CacheEntry[]>([]);
  const [operations, setOperations] = useState<OperationLog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [position, setPosition] = useState<"bottom-right" | "bottom-left">("bottom-right");
  const [cacheSize, setCacheSize] = useState("0 KB");
  const operationIdRef = useRef(0);
  const originalQueryRef = useRef<typeof client.query | null>(null);
  const originalMutateRef = useRef<typeof client.mutate | null>(null);

  // Calculate cache size
  const calculateSize = (data: AnyData) => {
    const str = JSON.stringify(data);
    const bytes = new Blob([str]).size;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Parse cache into readable entries
  const refreshCache = useCallback(() => {
    const rawCache = client.cache.extract() as Record<string, AnyData>;
    const entries: CacheEntry[] = [];

    Object.entries(rawCache).forEach(([key, value]) => {
      if (key === "ROOT_QUERY" || key === "ROOT_MUTATION") {
        // Expand root query/mutation fields
        if (value && typeof value === "object") {
          Object.entries(value as Record<string, AnyData>).forEach(([field, fieldValue]) => {
            if (field !== "__typename") {
              entries.push({
                key: `${key}.${field}`,
                typename: key,
                data: fieldValue,
              });
            }
          });
        }
      } else {
        entries.push({
          key,
          typename: (value as AnyData)?.__typename || "Unknown",
          data: value,
        });
      }
    });

    setCacheEntries(entries);
    setCacheSize(calculateSize(rawCache));
  }, [client]);

  // Intercept Apollo operations
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    // Store original methods
    originalQueryRef.current = client.query.bind(client);
    originalMutateRef.current = client.mutate.bind(client);

    // Intercept query
    client.query = async (options: AnyData) => {
      const id = ++operationIdRef.current;
      const name = (options.query.definitions[0] as AnyData)?.name?.value || "Anonymous Query";
      const timestamp = Date.now();

      const log: OperationLog = {
        id,
        type: "query",
        name,
        variables: options.variables,
        timestamp,
        status: "pending",
      };

      setOperations((prev) => [log, ...prev].slice(0, 100));

      try {
        const result = await originalQueryRef.current!(options);
        setOperations((prev) =>
          prev.map((op) =>
            op.id === id
              ? {
                  ...op,
                  status: "success" as const,
                  duration: Date.now() - timestamp,
                  data: result.data,
                }
              : op
          )
        );
        return result;
      } catch (error) {
        setOperations((prev) =>
          prev.map((op) =>
            op.id === id
              ? {
                  ...op,
                  status: "error" as const,
                  duration: Date.now() - timestamp,
                  error: String(error),
                }
              : op
          )
        );
        throw error;
      }
    };

    // Intercept mutate
    client.mutate = async (options: AnyData) => {
      const id = ++operationIdRef.current;
      const name =
        (options.mutation.definitions[0] as AnyData)?.name?.value || "Anonymous Mutation";
      const timestamp = Date.now();

      const log: OperationLog = {
        id,
        type: "mutation",
        name,
        variables: options.variables,
        timestamp,
        status: "pending",
      };

      setOperations((prev) => [log, ...prev].slice(0, 100));

      try {
        const result = await originalMutateRef.current!(options);
        setOperations((prev) =>
          prev.map((op) =>
            op.id === id
              ? {
                  ...op,
                  status: "success" as const,
                  duration: Date.now() - timestamp,
                  data: result.data,
                }
              : op
          )
        );
        return result;
      } catch (error) {
        setOperations((prev) =>
          prev.map((op) =>
            op.id === id
              ? {
                  ...op,
                  status: "error" as const,
                  duration: Date.now() - timestamp,
                  error: String(error),
                }
              : op
          )
        );
        throw error;
      }
    };

    return () => {
      // Restore original methods
      if (originalQueryRef.current) client.query = originalQueryRef.current;
      if (originalMutateRef.current) client.mutate = originalMutateRef.current;
    };
  }, [client]);

  // Also watch cache changes via Apollo's cache.watch
  useEffect(() => {
    if (!isOpen) return;

    refreshCache();

    // Poll for cache changes since watch requires a query
    const interval = setInterval(() => {
      if (autoRefresh) refreshCache();
    }, 1000);

    return () => clearInterval(interval);
  }, [client, isOpen, autoRefresh, refreshCache]);

  // Auto-refresh timer
  useEffect(() => {
    if (!isOpen || !autoRefresh) return;
    const interval = setInterval(refreshCache, 2000);
    return () => clearInterval(interval);
  }, [isOpen, autoRefresh, refreshCache]);

  // Keyboard shortcut: Ctrl+Shift+A
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Initial refresh when opened
  useEffect(() => {
    if (isOpen) refreshCache();
  }, [isOpen, refreshCache]);

  // Actions
  const refetchAll = async () => {
    await client.refetchQueries({ include: "all" });
    refreshCache();
  };

  const clearCache = () => {
    client.cache.reset();
    refreshCache();
  };

  const evictKey = (key: string) => {
    const [root, field] = key.split(".");
    if (root === "ROOT_QUERY" || root === "ROOT_MUTATION") {
      client.cache.evict({ id: root, fieldName: field });
    } else {
      client.cache.evict({ id: key });
    }
    client.cache.gc();
    refreshCache();
  };

  const clearOperations = () => setOperations([]);

  // Only render in development
  if (process.env.NODE_ENV !== "development") return null;

  // Floating button when closed
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-[9999] flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-xl text-white shadow-lg transition-all hover:scale-110 hover:bg-purple-500"
        style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)" }}
        title="Apollo DevTools (Ctrl+Shift+A)"
      >
        🚀
      </button>
    );
  }

  const positionClass = position === "bottom-right" ? "right-4 bottom-4" : "left-4 bottom-4";

  const filteredCache = cacheEntries.filter(
    (e) =>
      e.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.typename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOps = operations.filter((op) =>
    op.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingOps = operations.filter((op) => op.status === "pending").length;

  return (
    <div
      className={`fixed ${positionClass} z-[9999] flex flex-col overflow-hidden rounded-xl border border-purple-500/30 bg-[#1a1025]/98 font-mono text-xs text-white shadow-2xl backdrop-blur-md transition-all ${
        isMinimized ? "h-12 w-80" : "h-[500px] w-[480px]"
      }`}
      style={{ boxShadow: "0 0 40px rgba(139, 92, 246, 0.3)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/20 bg-purple-900/30 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🚀</span>
          <span className="font-bold text-purple-300">Apollo DevTools</span>
          <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[10px] text-purple-400">
            {cacheEntries.length} • {cacheSize}
          </span>
          {pendingOps > 0 && (
            <span className="flex items-center gap-1 rounded bg-yellow-500/20 px-1.5 py-0.5 text-[10px] text-yellow-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-400" />
              {pendingOps}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="rounded p-1 text-purple-300 hover:bg-purple-500/20"
          >
            {isMinimized ? "▲" : "▼"}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded p-1 text-purple-300 hover:bg-purple-500/20"
          >
            ✕
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Tabs */}
          <div className="flex border-b border-purple-500/20">
            {(["cache", "operations", "settings"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-3 py-2 text-[11px] capitalize ${
                  activeTab === tab
                    ? "bg-purple-500/20 text-purple-300"
                    : "text-purple-400/60 hover:bg-purple-500/10"
                }`}
              >
                {tab}
                {tab === "cache" && ` (${cacheEntries.length})`}
                {tab === "operations" && ` (${operations.length})`}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 border-b border-purple-500/20 bg-purple-900/10 px-3 py-1.5">
            <button
              onClick={refreshCache}
              className="rounded bg-purple-500/20 px-2 py-1 text-[10px] text-purple-300 hover:bg-purple-500/30"
            >
              🔄 Refresh
            </button>
            <button
              onClick={refetchAll}
              className="rounded bg-blue-500/20 px-2 py-1 text-[10px] text-blue-300 hover:bg-blue-500/30"
            >
              ⟳ Refetch All
            </button>
            <button
              onClick={clearCache}
              className="rounded bg-red-500/20 px-2 py-1 text-[10px] text-red-300 hover:bg-red-500/30"
            >
              🗑 Clear Cache
            </button>
            {activeTab === "operations" && (
              <button
                onClick={clearOperations}
                className="rounded bg-orange-500/20 px-2 py-1 text-[10px] text-orange-300 hover:bg-orange-500/30"
              >
                Clear Logs
              </button>
            )}
          </div>

          {/* Search */}
          {activeTab !== "settings" && (
            <div className="border-b border-purple-500/20 p-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded bg-purple-900/30 px-3 py-1.5 text-sm text-white placeholder:text-purple-400/40 focus:ring-1 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-auto p-2">
            {/* Cache Tab */}
            {activeTab === "cache" && (
              <div className="space-y-1">
                {filteredCache.length === 0 ? (
                  <p className="p-4 text-center text-purple-400/50">
                    {searchTerm ? "No matches" : "Cache is empty. Make some queries!"}
                  </p>
                ) : (
                  filteredCache.map((entry) => (
                    <div key={entry.key} className="rounded bg-purple-900/20">
                      <div
                        className="flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-purple-500/10"
                        onClick={() => setSelectedKey(selectedKey === entry.key ? null : entry.key)}
                      >
                        <div className="min-w-0 flex-1">
                          <span className="rounded bg-purple-500/30 px-1 py-0.5 text-[9px] text-purple-300">
                            {entry.typename}
                          </span>
                          <span className="ml-2 text-purple-400">{entry.key}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              evictKey(entry.key);
                            }}
                            className="rounded p-1 text-red-400 hover:bg-red-500/20"
                            title="Evict"
                          >
                            🗑
                          </button>
                          <span className="text-purple-500">
                            {selectedKey === entry.key ? "▼" : "▶"}
                          </span>
                        </div>
                      </div>
                      {selectedKey === entry.key && (
                        <pre className="max-h-60 overflow-auto border-t border-purple-500/10 bg-black/40 p-3 text-[10px] text-green-400">
                          {JSON.stringify(entry.data, null, 2)}
                        </pre>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Operations Tab */}
            {activeTab === "operations" && (
              <div className="space-y-1">
                {filteredOps.length === 0 ? (
                  <p className="p-4 text-center text-purple-400/50">
                    {searchTerm
                      ? "No matches"
                      : "No operations yet. Navigate around to trigger queries!"}
                  </p>
                ) : (
                  filteredOps.map((op) => (
                    <details key={op.id} className="rounded bg-purple-900/20">
                      <summary className="flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-purple-500/10">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              op.status === "pending"
                                ? "animate-pulse bg-yellow-400"
                                : op.status === "error"
                                  ? "bg-red-400"
                                  : "bg-green-400"
                            }`}
                          />
                          <span
                            className={`rounded px-1 py-0.5 text-[9px] font-bold ${
                              op.type === "mutation"
                                ? "bg-blue-500/30 text-blue-300"
                                : "bg-purple-500/30 text-purple-300"
                            }`}
                          >
                            {op.type.toUpperCase()}
                          </span>
                          <span className="text-purple-300">{op.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[9px] text-purple-500">
                          {op.duration && <span>{op.duration}ms</span>}
                          <span>{new Date(op.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </summary>
                      <div className="border-t border-purple-500/10 bg-black/40 p-3">
                        <p className="mb-1 text-[9px] font-bold text-purple-400">Variables:</p>
                        <pre className="mb-2 text-[10px] text-yellow-400">
                          {JSON.stringify(op.variables, null, 2) || "null"}
                        </pre>
                        {op.error && (
                          <>
                            <p className="mb-1 text-[9px] font-bold text-red-400">Error:</p>
                            <pre className="text-[10px] text-red-400">{op.error}</pre>
                          </>
                        )}
                        {op.data && (
                          <>
                            <p className="mb-1 text-[9px] font-bold text-green-400">Data:</p>
                            <pre className="max-h-40 overflow-auto text-[10px] text-green-400">
                              {JSON.stringify(op.data, null, 2)}
                            </pre>
                          </>
                        )}
                      </div>
                    </details>
                  ))
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-4 p-2">
                <div>
                  <label className="mb-2 block text-[11px] font-bold text-purple-300">
                    Position
                  </label>
                  <div className="flex gap-2">
                    {(["bottom-left", "bottom-right"] as const).map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setPosition(pos)}
                        className={`flex-1 rounded px-3 py-2 text-[10px] ${
                          position === pos
                            ? "bg-purple-500/30 text-purple-200"
                            : "bg-purple-900/30 text-purple-400 hover:bg-purple-500/20"
                        }`}
                      >
                        {pos.replace("-", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-2 text-[11px] text-purple-400">
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="h-4 w-4 rounded"
                  />
                  Auto-refresh cache (every 2s)
                </label>

                <div className="rounded bg-purple-900/20 p-3">
                  <p className="mb-2 text-[11px] font-bold text-purple-300">Stats</p>
                  <p className="text-[10px] text-purple-400">
                    Cache entries: {cacheEntries.length}
                  </p>
                  <p className="text-[10px] text-purple-400">Cache size: {cacheSize}</p>
                  <p className="text-[10px] text-purple-400">
                    Operations logged: {operations.length}
                  </p>
                </div>

                <div className="rounded bg-purple-900/20 p-3">
                  <p className="text-[10px] text-purple-400">
                    <kbd className="rounded bg-purple-500/20 px-1">Ctrl+Shift+A</kbd> to toggle
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-purple-500/20 bg-purple-900/20 px-3 py-1 text-[9px] text-purple-400/50">
            Apollo Client DevTools • Cache updates in real-time
          </div>
        </>
      )}
    </div>
  );
}
