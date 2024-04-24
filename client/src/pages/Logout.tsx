import { ActionEnum } from "@/context/reducer";
import { useAuthContext } from "@/context/useAuthContext";
import { api } from "@/services/api";
import { logout } from "@/services/auth-services";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function logoutUser() {
      //clear axios headers
      delete api.defaults.headers.common["Authorization"];
      delete api.defaults.headers.common["Content-Type"];

      try {
        dispatch({ type: ActionEnum.SET_USER, payload: null });
        dispatch({ type: ActionEnum.SET_IS_LOGGED_IN, payload: false });
        dispatch({ type: ActionEnum.SET_TOKEN, payload: null });
        const res = await logout();
        console.log(res.data.data);

        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
    logoutUser();
  }, [dispatch, navigate]);
}

export default Logout;
