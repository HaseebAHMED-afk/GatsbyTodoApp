import React, { useContext, useRef, useReducer, useState } from "react";
import {
  Container,
  Flex,
  Heading,
  Button,
  Input,
  Label,
  NavLink,
  Checkbox
} from "theme-ui";
import { Router, Link } from "@reach/router";
import { IdentityContext } from '../../netlifyIdentityContext'


const todosReducer = ( state , action ) => {
    switch(action.type){
        case "addTodo":
            return [{done: false , value: action.payload}, ...state];
        case "toggleTodoDone":
            const newState = [...state];
            newState[action.payload] ={
                done: !state[action.payload].done,
                vale: state[action.payload].value
            }
            return newState;
    }
  }

const Dash =  () => {
  const { user, identity } = useContext(IdentityContext);
  const inputRef = useRef();
  const [todos , dispatch] = useReducer(todosReducer , [])


  

  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to={"/app"} p={2}>
          Dashboard
        </NavLink>
        {user && (
          <NavLink
            href="#!"
            p={2}
            onClick={() => {
              identity.logout();
            }}
          >
            Log out {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
      <Flex
        as="form"

        onSubmit={
            (e)=>{
                e.preventDefault()
                dispatch({type: "addTodo" , payload: inputRef.current.value})
                inputRef.current.value=""
            }
        }
      >
        <Label sx={{ display: "flex" }}>
          <span>Add&nbsp;Todo</span>
          <Input ref={inputRef} sx={{ marginLeft: 1 }} />
        </Label>
        <Button sx={{ marginLeft: 1 }}>Submit</Button>
      </Flex>
      <Flex sx={{ flexDirection: "column" }}>
       <ul sx={{listStyleType:'none'}} >
           {
               todos.map((todo , i) => {
                   return (<Flex as={"li"}
                        onClick={
                            () =>{
                                dispatch({
                                    type:"toggleTodoDone",
                                    payload:i
                                })
                            }
                        }
                   >
                        <Checkbox checked={todo.done} />
                        <span>{todo.value}</span>
                    </Flex>)
               })
           }
       </ul>
      </Flex>
    </Container>
  );
};


export default Dash