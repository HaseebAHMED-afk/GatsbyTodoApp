import React, { useContext } from 'react'
import { Router } from '@reach/router'
import { IdentityContext } from '../../netlifyIdentityContext'
import { Flex , Heading , Button } from 'theme-ui'


let Dash = () => {

    const {user } = useContext( IdentityContext )

    return (
        <div>
            {
                user && user.user_metadata.full_name
            }
        </div>
    )
}

let DashLoggedOut = () => {
    const {user , identity} = useContext( IdentityContext )
    return (
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
    )
}

export default props => {


    return(
        <Router>
            <Dash path="/app" />
        </Router>
    )

}