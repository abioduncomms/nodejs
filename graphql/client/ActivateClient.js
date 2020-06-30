import fetch from 'node-fetch';
import { setContext } from  'apollo-link-context';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
    uri:'https://staging.commslog.com/auth/graphql',
    fetch:fetch
  });
  
  const authLink = setContext(() => {
  });
  
 const ActivateClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  export default ActivateClient
