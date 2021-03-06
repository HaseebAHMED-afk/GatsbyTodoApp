import React, { useContext, useRef, useReducer } from "react";
import {
  Container,
  Flex,
  Button,
  Input,
  Label,
  NavLink,
  Checkbox,
} from "theme-ui";
import { Link } from "@reach/router";
import { IdentityContext } from "../../netlifyIdentityContext";
import { gql, useQuery, useMutation } from "@apollo/client";

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodoDone($id: ID!) {
    updateTodoDone(id: $id) {
      text
      done
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`;

const todosReducer = (state, action) => {
  switch (action.type) {
    case "addTodo":
      return [{ done: false, value: action.payload }, ...state];
    case "toggleTodoDone":
      const newState = [...state];
      newState[action.payload] = {
        done: !state[action.payload].done,
        vale: state[action.payload].value,
      };
      return newState;
  }
};

const Dash = () => {
  const { user, identity } = useContext(IdentityContext);
  const inputRef = useRef();
  const [todos, dispatch] = useReducer(todosReducer, []);
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodoDone] = useMutation(UPDATE_TODO);
  const [loading, error, data, refetch] = useQuery(GET_TODOS);

  console.log(data);

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
        onSubmit={async (e) => {
          e.preventDefault();
          await addTodo({ variables: { text: inputRef.current.value } });
          inputRef.current.value = "";
          await refetch();
        }}
      >
        <Label sx={{ display: "flex" }}>
          <span>Add&nbsp;Todo</span>
          <Input ref={inputRef} sx={{ marginLeft: 1 }} />
        </Label>
        <Button sx={{ marginLeft: 1 }}>Submit</Button>
      </Flex>
      <Flex sx={{ flexDirection: "column" }}>
        {loading ? <div>Loading...</div> : null}
        {error ? <div>{error.message}</div> : null}
        {!loading && !error && (
          <ul sx={{ listStyleType: "none" }}>
            {data.todos.map((todo, i) => {
              return (
                <Flex
                  as={"li"}
                  key={i}
                  // onClick={async () => {
                  //   console.log("updateTodoDone");
                  //   await updateTodoDone({ variables: { id: todo.id } });
                  //   console.log("refetching");
                  //   await refetch();
                  // }}
                >
                  <Checkbox checked={todo.done} readOnly />
                  <span>{todo.text}</span>
                </Flex>
              );
            })}
          </ul>
        )}
      </Flex>
    </Container>
  );
};

export default Dash;
