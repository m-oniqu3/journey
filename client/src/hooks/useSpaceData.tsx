import { SpacesEnum } from "@/context/spaces-reducer";
import { useAuthContext } from "@/context/useAuthContext";
import { useSpacesContext } from "@/context/useSpacesContext";
import {
  getUsersSpaces,
  joinSpace,
  leaveSpace,
} from "@/services/space-services";
import { handleError } from "@/utils/handleError";
import { useEffect, useState } from "react";

// function useSpaceData() {
//   const [userSpaces, setUserSpaces] = useState<UserSpaces | null>(null);

//   const {
//     state: { user },
//   } = useAuthContext();

//   const queryClient = useQueryClient();

//   async function fetchUserSpaces() {
//     try {
//       if (!user) return;

//       const response = await getUsersSpaces(user.id);
//       console.log(response);
//       return response;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   //fecth with react query instead
//   const { isLoading, isError, error } = useQuery({
//     queryKey: ["userSpaces", user ? user.id : ""],
//     queryFn: fetchUserSpaces,
//     onSuccess: (data) => {
//       if (data) setUserSpaces(data);
//     },
//   });

//   //mutate user spaces

//   const { mutate: joinSpaceMutation, isLoading: isJoiningSpace } = useMutation({
//     mutationFn: (space: string) => join(space, user ? user.id : ""),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["userSpaces", user ? user.id : ""]);
//     },
//   });

//   const { mutate: leaveSpaceMutation, isLoading: isLeavingSpace } = useMutation(
//     {
//       mutationFn: (space: string) => leave(space, user ? user.id : ""),
//       onSuccess: () => {
//         queryClient.invalidateQueries(["userSpaces", user ? user.id : ""]);
//       },
//     }
//   );

//   // determine if user should join or leave space
//   function handleJoinLeaveSpace(isJoined: boolean, space: string) {
//     if (isJoined) leaveSpaceMutation(space);
//     else joinSpaceMutation(space);
//   }

//   async function join(space: string, userID: string) {
//     if (!userID) return;

//     try {
//       const response = await joinSpace(space, userID);
//       return response;
//     } catch (error) {
//       const message = handleError(error);
//       console.log(message);
//       throw new Error(message);
//     }
//   }

//   async function leave(space: string, userID: string) {
//     if (!userID) return;

//     try {
//       const response = await leaveSpace(space, userID);
//       return response;
//     } catch (error) {
//       const message = handleError(error);
//       console.log(message);
//       throw new Error(message);
//     }
//   }

//   return {
//     userSpaces,
//     handleJoinLeaveSpace,
//     isLoading,
//     isError,
//     error,
//     isJoiningSpace,
//     isLeavingSpace,
//   };
// }

function useSpaceData() {
  const [isJoiningSpace, setIsJoiningSpace] = useState(false);
  const [isLeavingSpace, setIsLeavingSpace] = useState(false);

  const {
    state: { user },
  } = useAuthContext();
  const {
    dispatch,
    state: { userspaces },
  } = useSpacesContext();

  useEffect(() => {
    async function fetchUserSpaces() {
      try {
        if (!user) return;

        const response = await getUsersSpaces(user.id);
        dispatch({ type: SpacesEnum.SET_SPACES, payload: response });
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserSpaces();
  }, [user, dispatch]);

  // determine if user should join or leave space
  function handleJoinLeaveSpace(isJoined: boolean, space: string) {
    if (!user) return;

    if (!isJoined) join(space, user.id);
    else leave(space, user.id);
  }

  async function join(space: string, userID: string) {
    console.log("joining space");
    setIsJoiningSpace((state) => !state);
    try {
      const response = await joinSpace(space, userID);
      console.log(response);

      dispatch({ type: SpacesEnum.JOIN_SPACE, payload: response });
    } catch (error) {
      const message = handleError(error);
      console.log(message);
      throw new Error(message);
    } finally {
      setIsJoiningSpace(false);
    }
  }

  async function leave(space: string, userID: string) {
    console.log("leaving space");

    setIsLeavingSpace((state) => !state);
    try {
      const response = await leaveSpace(space, userID);
      console.log(response);
      dispatch({ type: SpacesEnum.LEAVE_SPACE, payload: space });
    } catch (error) {
      const message = handleError(error);
      console.log(message);
      throw new Error(message);
    } finally {
      setIsLeavingSpace(false);
    }
  }

  return {
    userSpaces: userspaces,
    handleJoinLeaveSpace,

    isJoiningSpace,
    isLeavingSpace,
  };
}

export default useSpaceData;
