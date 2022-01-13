import '../styles/globals.css'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import type { AppProps } from 'next/app'

const client = new ApolloClient({
  // Because this is a small app, used InMemoryCache
  cache: new InMemoryCache(),
  uri: 'https://graphql-weather-api.herokuapp.com',
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
