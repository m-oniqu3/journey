import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";

import LogIn from "@/components/account/LogIn";
import Register from "@/components/account/Register";
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
