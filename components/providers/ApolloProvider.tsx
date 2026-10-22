"use client";

import { ApolloProvider as BaseApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/lib/api/graphql/apollo";

// Apollo DevTools reads the client off this global in development.
declare global {
  interface Window {
    __APOLLO_CLIENT__?: typeof apolloClient;
  }
}

// Expose Apollo Client to window for DevTools in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  window.__APOLLO_CLIENT__ = apolloClient;
}

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <BaseApolloProvider client={apolloClient}>{children}</BaseApolloProvider>;
}
