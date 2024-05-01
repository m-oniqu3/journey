import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "@/App";
import AuthContextProvider from "@/context/AuthContext";
import SpacesContextProvider from "@/context/SpacesContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SpacesContextProvider>
        <App />
      </SpacesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
