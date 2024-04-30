import { ActionEnum } from "@/context/reducer";
import { useAuthContext } from "@/context/useAuthContext";
import {
  getUsersSpaces,
  joinSpace,
  leaveSpace,
} from "@/services/space-services";
import { handleError } from "@/utils/handleError";
import { useEffect } from "react";

function useSpaceData() {
  const {
    dispatch,
    state: { user, userSpaces },
  } = useAuthContext();

  useEffect(() => {
    async function fetchUserSpaces() {
      console.log("fetching user spaces");
      try {
        const response = await getUsersSpaces(user!.id);
        dispatch({ type: ActionEnum.SET_USER_SPACES, payload: response });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    if (!user) return;
    fetchUserSpaces();
  }, [user, dispatch]);

  // determine if user should join or leave space

  function handleJoinLeaveSpace(isJoined: boolean, space: string) {
    if (isJoined) leave(space);
    else join(space);
  }

  async function join(space: string) {
    if (!user) return;
    try {
      const response = await joinSpace(space, user.id);
      console.log(response);
    } catch (error) {
      const message = handleError(error);
      console.log(message);
    }
  }

  async function leave(space: string) {
    if (!user) return;
    try {
      const response = await leaveSpace(space, user.id);
      console.log(response);
    } catch (error) {
      const message = handleError(error);
      console.log(message);
    }
  }

  return {
    userSpaces,
    handleJoinLeaveSpace,
  };
}

export default useSpaceData;
