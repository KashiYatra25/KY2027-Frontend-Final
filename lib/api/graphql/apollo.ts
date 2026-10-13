import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const link = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/graphql`,
  credentials: "include",
});

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          myAccount: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  // DevTools are automatically enabled in development mode in Apollo Client v4
});
