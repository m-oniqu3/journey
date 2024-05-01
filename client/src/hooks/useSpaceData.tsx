import { useAuthContext } from "@/context/useAuthContext";
import {
  getUsersSpaces,
  joinSpace,
  leaveSpace,
} from "@/services/space-services";
import { UserSpaces } from "@/types/space";
import { handleError } from "@/utils/handleError";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

function useSpaceData() {
  const [userSpaces, setUserSpaces] = useState<UserSpaces | null>(null);

  const {
    state: { user },
  } = useAuthContext();

  const queryClient = useQueryClient();

  async function fetchUserSpaces() {
    try {
      if (!user) return;

      const response = await getUsersSpaces(user.id);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  //fecth with react query instead
  const { isLoading, isError, error } = useQuery({
    queryKey: ["userSpaces", user ? user.id : ""],
    queryFn: fetchUserSpaces,
    onSuccess: (data) => {
      if (data) setUserSpaces(data);
    },
  });

  //mutate user spaces

  const { mutate: joinSpaceMutation, isLoading: isJoiningSpace } = useMutation({
    mutationFn: (space: string) => join(space, user ? user.id : ""),
    onSuccess: () => {
      queryClient.invalidateQueries(["userSpaces", user ? user.id : ""]);
    },
  });

  const { mutate: leaveSpaceMutation, isLoading: isLeavingSpace } = useMutation(
    {
      mutationFn: (space: string) => leave(space, user ? user.id : ""),
      onSuccess: () => {
        queryClient.invalidateQueries(["userSpaces", user ? user.id : ""]);
      },
    }
  );

  // determine if user should join or leave space
  function handleJoinLeaveSpace(isJoined: boolean, space: string) {
    if (isJoined) leaveSpaceMutation(space);
    else joinSpaceMutation(space);
  }

  async function join(space: string, userID: string) {
    if (!userID) return;

    try {
      const response = await joinSpace(space, userID);
      return response;
    } catch (error) {
      const message = handleError(error);
      console.log(message);
      throw new Error(message);
    }
  }

  async function leave(space: string, userID: string) {
    if (!userID) return;

    try {
      const response = await leaveSpace(space, userID);
      return response;
    } catch (error) {
      const message = handleError(error);
      console.log(message);
      throw new Error(message);
    }
  }

  return {
    userSpaces,
    handleJoinLeaveSpace,
    isLoading,
    isError,
    error,
    isJoiningSpace,
    isLeavingSpace,
  };
}

export default useSpaceData;
