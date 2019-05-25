import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, HttpLink } from 'apollo-client-preset';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import defaults from './local/defaults';
import resolvers from './local/resolvers';
import typeDefs from './typeDefs';

// Set up Cache
const cache = new InMemoryCache();

// Set up Local State
const stateLink = withClientState({
  cache,
  defaults,
  resolvers,
  typeDefs,
});

// Initialize the Apollo Client
const client = new ApolloClient({
  // link: ApolloLink.from([
  //   stateLink,
  //   new HttpLink({
  //     uri:
  //       process.env.NODE_ENV === 'production'
  //         ? '/graphql'
  //         : 'http://localhost:4000/graphql',
  //     credentials:
  //       process.env.NODE_ENV === 'production' ? 'include' : 'same-origin',
  //   }),
  // ]),
  // cache: cache,
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: '/graphql',
      credentials: 'include',
    }),
  ]),
  cache: cache,
});

export default client;
