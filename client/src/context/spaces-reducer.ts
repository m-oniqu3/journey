import { UserSpaces } from "@/types/space";

export enum SpacesEnum {
  SET_SPACES = "SET_SPACES",
  JOIN_SPACE = "JOIN_SPACE",
  LEAVE_SPACE = "LEAVE_SPACE",
}

export interface SpacesState {
  userspaces: UserSpaces;
}

type SetSpacesAction = {
  type: SpacesEnum.SET_SPACES;
  payload: UserSpaces;
};

type JoinSpaceAction = {
  type: SpacesEnum.JOIN_SPACE;
  payload: { id: number; name: string; avatar: string; isCreator: boolean };
};

type LeaveSpaceAction = {
  type: SpacesEnum.LEAVE_SPACE;
  payload: string;
};

export type SpaceActions = SetSpacesAction | JoinSpaceAction | LeaveSpaceAction;

export const initalSpacesState: SpacesState = {
  userspaces: {},
};

function spacesReducer(state: SpacesState, action: SpaceActions) {
  switch (action.type) {
    case SpacesEnum.SET_SPACES:
      return { ...state, userspaces: action.payload };

    case SpacesEnum.JOIN_SPACE:
      return {
        ...state,
        userspaces: {
          ...state.userspaces,
          [action.payload.name]: action.payload,
        },
      };

    case SpacesEnum.LEAVE_SPACE: {
      const newSpaces = { ...state.userspaces };

      delete newSpaces[action.payload];
      return { ...state, userspaces: newSpaces };
    }

    default:
      return state;
  }
}

export default spacesReducer;
