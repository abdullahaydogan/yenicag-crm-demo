import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import { ApolloProvider } from '@apollo/client/react';

import type { ReactNode } from 'react';

const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URL,
  }),

  cache: new InMemoryCache(),
});

type Props = {
  children: ReactNode;
};

export default function GraphqlProvider({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}