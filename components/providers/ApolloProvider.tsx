"use client";

import { ApolloProvider as BaseApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/lib/api/graphql/apollo";

// Expose Apollo Client to window for DevTools in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  // @ts-expect-error - Apollo DevTools looks for this
  window.__APOLLO_CLIENT__ = apolloClient;
}

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <BaseApolloProvider client={apolloClient}>{children}</BaseApolloProvider>;
}
