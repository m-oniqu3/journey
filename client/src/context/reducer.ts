import { type User } from "@/types/auth";

export enum ActionEnum {
  SET_USER = "SET_USER",
  SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN",
  SET_TOKEN = "SET_TOKEN",
}

export interface State {
  user: User | null;
  isLoggedIn: boolean;
  token: { access_token: string; expiry: number } | null;
}

interface SetUserAction {
  type: ActionEnum.SET_USER;
  payload: User | null;
}

interface SetIsLoggedInAction {
  type: ActionEnum.SET_IS_LOGGED_IN;
  payload: boolean;
}

interface SetTokenAction {
  type: ActionEnum.SET_TOKEN;
  payload: { access_token: string; expiry: number } | null;
}

export type Actions = SetUserAction | SetIsLoggedInAction | SetTokenAction;

export const initialState: State = {
  user: null,
  token: null,
  isLoggedIn: false,
};

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case ActionEnum.SET_USER:
      // save to local storage
      if (action.payload) {
        localStorage.setItem("journey-user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("journey-user");
      }

      return Object.assign({}, state, { user: action.payload });

    case ActionEnum.SET_IS_LOGGED_IN:
      return Object.assign({}, state, { isLoggedIn: action.payload });

    case ActionEnum.SET_TOKEN:
      // save to local storage
      if (action.payload) {
        localStorage.setItem("journey-token", action.payload.access_token);
      } else {
        localStorage.removeItem("journey-token");
      }

      return Object.assign({}, state, { token: action.payload });

    default:
      return state;
  }
}

export default reducer;
