import React from "react";
import "./App.css";
import { useCookies } from "react-cookie";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
function App() {
  const [cookies] = useCookies();

  const isAuthenticated = cookies.isAuthenticated === "true";

  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
