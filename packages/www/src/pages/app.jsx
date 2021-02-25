import React, { useContext } from 'react'
import { Router } from '@reach/router'
import { IdentityContext } from '../../netlifyIdentityContext'
import { Flex , Heading , Button, Container  } from 'theme-ui'
import Dash from '../components/dashboard'



let DashLoggedOut = () => {
    const { identity} = useContext( IdentityContext )
    return (
        <Container>
        
        <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">Todo App</Heading>
        <Button
          onClick={() => {
           identity.open();
          }}
          sx={{ margin: 2, color: "white", backgroundColor: "green" }}
        >
          Login
        </Button>   
      </Flex>
      </Container>
    )
}

export default () => {

    const { user } = useContext(IdentityContext)

    if(!user){
        return(
            <Router>
                <DashLoggedOut path="/app" />
            </Router>
        )
    }


    return(
        <Router>
            <Dash path="/app" />
        </Router>
    )

}   