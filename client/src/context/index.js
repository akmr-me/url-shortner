import React, { createContext, useContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useSessionStorage from "../hooks/useSessionStorage";

const User = createContext();
const initailState = {
  error: "",
  user: {},
  message: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SERVER_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "Message":
      return {
        ...state,
        message: action.payload,
      };
    default:
      return { ...state };
  }
};
const UserContext = ({ children }) => {
  const [userState, userDispatcher] = useReducer(reducer, initailState);
  const [storage, setStorage] = useLocalStorage("url✂️", []);
  const [session, setSession] = useSessionStorage("url✂️", {});

  useEffect(() => {
    if (session?.email) {
      userDispatcher({ type: "USER", payload: session });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <User.Provider
      value={{
        userState,
        userDispatcher,
        storage,
        setStorage,
        session,
        setSession,
      }}
    >
      {children}
    </User.Provider>
  );
};

export default UserContext;

export function UserState() {
  return useContext(User);
}
