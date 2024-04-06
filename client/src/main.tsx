import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";

import AuthContextProvider from "@/context/AuthContext";
import LogIn from "@/pages/LogIn";
import Register from "@/pages/Register";
import AccountLayout from "./routes/AccountLayout";
import RootLayout from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <p>home page</p> },
      { path: "/about", element: <p>about page</p> },
    ],
  },
  {
    // layout route for account routes
    element: <AccountLayout />,
    children: [
      { path: "/register", element: <Register /> },
      { path: "/login", element: <LogIn /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
