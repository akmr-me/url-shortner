import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserContext from "./context";
import ErrorBoundry from "./Components/ErrorBoundry";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundry>
      <UserContext>
        <App />
      </UserContext>
    </ErrorBoundry>
  </React.StrictMode>
);
