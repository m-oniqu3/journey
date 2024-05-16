import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "@/App";
import AuthContextProvider from "@/context/AuthContext";
import SpacesContextProvider from "@/context/SpacesContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SpacesContextProvider>
          <App />
        </SpacesContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
