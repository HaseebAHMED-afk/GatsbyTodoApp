import React,{useEffect} from 'react'
import { Button, Container, Flex, Heading } from 'theme-ui'
import netlifyIdentity from 'netlify-identity-widget'

export default props => {
    

    useEffect(()=>{
        netlifyIdentity.init({})
    } , [])
    
    return (
    <Container>
        <Flex sx={{flexDirection:'column' , padding:3}} >
        <Heading as='h1' >Todo App</Heading>
        <Button onClick={()=>{
            netlifyIdentity.open()
        }} sx={{margin:2 , color:'white' , backgroundColor:'green'}} >Login</Button>
        </Flex>
    </Container>
)}