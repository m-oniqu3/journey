import { ActionEnum } from "@/context/reducer";
import { useAuthContext } from "@/context/useAuthContext";
import router from "@/routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useEffect } from "react";

import { RouterProvider } from "react-router-dom";

function App() {
  const { dispatch } = useAuthContext();

  //check for user when app mounts
  useEffect(() => {
    const user = localStorage.getItem("journey-user");
    const token = localStorage.getItem("journey-token");

    if (!token) {
      dispatch({ type: ActionEnum.LOGOUT });
    }

    if (user) {
      dispatch({ type: ActionEnum.SET_USER, payload: JSON.parse(user) });
      dispatch({ type: ActionEnum.SET_IS_LOGGED_IN, payload: true });
    }
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-right"
        position="right"
      />
    </>
  );
}

export default App;
