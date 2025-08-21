import { GraphQLClient } from 'graphql-request';

export const graphqlClient = new GraphQLClient('http://localhost:3000/graphql', {
  credentials: 'include', // Optional, if you're using cookies
  headers: {
    "apollo-require-preflight": "true", // This fixes CSRF error
  },
});
