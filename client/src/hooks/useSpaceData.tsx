import { ActionEnum } from "@/context/reducer";
import { useAuthContext } from "@/context/useAuthContext";
import { getUsersSpaces } from "@/services/space-services";
import { useEffect, useState } from "react";

function useSpaceData() {
  const {
    dispatch,
    state: { user, userSpaces },
  } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUserSpaces() {
      setIsLoading(true);
      try {
        const response = await getUsersSpaces(user!.id);
        dispatch({ type: ActionEnum.SET_USER_SPACES, payload: response });
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!user) return;
    fetchUserSpaces();
  }, [user, dispatch]);

  return {
    userSpaces,
    isLoading,
  };
}

export default useSpaceData;
