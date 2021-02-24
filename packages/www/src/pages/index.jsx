import React, { useContext} from "react";
import { Button, Container, Flex, Heading, NavLink } from "theme-ui";
import { Link } from 'gatsby'
import { IdentityContext } from '../../netlifyIdentityContext'





export default (props) => {

    const {user ,identity} = useContext(IdentityContext)

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
            user && <NavLink as={Link} p={2} >
            {
               user.user_metadata.full_name
            }
        </NavLink>
        }
        
      </Flex>
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
  );
};
