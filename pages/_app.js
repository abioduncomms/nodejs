import '../styles/global.css';
import  'materialize-css/dist/css/materialize.css'
import 'react-toastify/dist/ReactToastify.css';
import {ApolloProvider} from '@apollo/react-hooks';
import client from '../graphql/client/AuthClient';
import { AuthProvider } from '../config/context';


export default function App({Component, pageProps}){

    return <AuthProvider>
        <ApolloProvider client={client}><Component {...pageProps} /></ApolloProvider>
        </AuthProvider>
}