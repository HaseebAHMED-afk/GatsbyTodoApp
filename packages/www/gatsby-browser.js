const React=require('react');
const wrapRootElement = require('./wrap-root-element')
const {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    HttpLink
} = require('@apollo/client')



const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "https://jamstacktodoappbyhaseebahmed.netlify.app/.netlify/functions/graphql"
    })
})



exports.wrapRootElement = ({element}) =>{
    return (
        <ApolloProvider client={client} >
            {wrapRootElement({element})}
        </ApolloProvider>
    )
}