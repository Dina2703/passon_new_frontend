import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>
);
