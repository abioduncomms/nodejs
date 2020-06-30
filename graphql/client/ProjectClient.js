import fetch from 'node-fetch';
import { setContext } from  'apollo-link-context';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
    uri:'https://staging.commslog.com/project/graphql',
    fetch:fetch
  });
  

  const getLoginData =()=>{
    let savedUser = JSON.parse(localStorage.getItem("pubsiwp"));
    if(savedUser){
      return savedUser;
    }
    return false
   }

  const authLink = setContext(() => {
    const token = getLoginData().accessToken;
    return {
      headers: {
        Authorization: token ? `${token}` : ""
      }
    }
  });
  
 export const projectClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

