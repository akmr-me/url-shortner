import { createContext, useContext, useReducer } from "react";

const passwordContext = createContext();

const initialState = {
  email: "",
  display: 1,
  message: "",
  otp: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "FORGOT_PASSWORD_SUCCESS":
      return {
        ...state,
        display: 2,
        message: action.payload.message,
        email: action.payload.email,
      };
    case "OTP_SUCCESS":
      return {
        ...state,
        otp: action.payload,
        display: 3,
      };
    default:
      return { ...state };
  }
};
export default function PasswordProvider({ children }) {
  const [passwordState, dispatch] = useReducer(reducer, initialState);

  return (
    <passwordContext.Provider value={{ passwordState, dispatch }}>
      {children}
    </passwordContext.Provider>
  );
}

export function PasswordState() {
  return useContext(passwordContext);
}
