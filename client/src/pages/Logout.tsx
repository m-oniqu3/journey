import { ActionEnum } from "@/context/reducer";
import { useAuthContext } from "@/context/useAuthContext";
import { api } from "@/services/api";
import { logout } from "@/services/auth-services";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function logoutUser() {
      try {
        //clear axios headers
        delete api.defaults.headers.common["Authorization"];
        delete api.defaults.headers.common["Content-Type"];

        await logout();
        dispatch({ type: ActionEnum.LOGOUT });

        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
    logoutUser();
  }, [dispatch, navigate]);

  return null;
}

export default LogOut;
