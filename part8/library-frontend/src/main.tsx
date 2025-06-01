import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { createClient } from 'graphql-ws';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider, useAuth } from './auth';
import './index.css';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library.auth.user');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_APOLLO_SERVER_URL,
});

const wsLink = new GraphQLWsLink(createClient({ url: 'ws://localhost:4000' }));

const combinedLink = from([authLink, httpLink]);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  combinedLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

const InnerApp = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};

const App = () => {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
