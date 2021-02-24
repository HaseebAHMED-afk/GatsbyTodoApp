import React, { useContext } from 'react'
import { Router , Link} from '@reach/router'
import { IdentityContext } from '../../netlifyIdentityContext'
import { Flex , Heading , Button, Container , NavLink } from 'theme-ui'
// import { Link } from 'gatsby'


let Dash = () => {

    const {user,identity } = useContext( IdentityContext )

    return (
        <Container>
        <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to="/app" p={2}>
          Dashboard
        </NavLink>
        {
            user && <NavLink  p={2}
                onClick={()=>{
                    identity.logout()
                }}
            
            >
                Log Out
            {
               user.user_metadata.full_name
            }
        </NavLink>
        }
        
      </Flex>
      </Container>
    )
}

let DashLoggedOut = () => {
    const {user , identity} = useContext( IdentityContext )
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

export default props => {

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