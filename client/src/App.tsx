import { ActionEnum } from "@/context/reducer";
import { useAuthContext } from "@/context/useAuthContext";
import router from "@/routes";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
