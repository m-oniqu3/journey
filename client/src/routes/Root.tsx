import { ActionEnum } from "@/context/reducer";
import { useAuthContext } from "@/context/useAuthContext";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Root() {
  const { dispatch, state } = useAuthContext();

  useEffect(() => {
    console.log(state);
  }, [state]);

  //check for user when app mounts
  useEffect(() => {
    const user = localStorage.getItem("journey-user");

    if (user) {
      dispatch({ type: ActionEnum.SET_USER, payload: JSON.parse(user) });
      dispatch({ type: ActionEnum.SET_IS_LOGGED_IN, payload: true });
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
