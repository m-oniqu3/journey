import { type User } from "@/types/auth";

export enum ActionEnum {
  SET_USER = "SET_USER",
  SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN",
  SET_TOKEN = "SET_TOKEN",
  LOGOUT = "LOGOUT",
}

export interface State {
  user: User | null;
  isLoggedIn: boolean;
  token: { access_token: string; expiry: number } | null;
}

interface SetUserAction {
  type: ActionEnum.SET_USER;
  payload: User;
}

interface SetIsLoggedInAction {
  type: ActionEnum.SET_IS_LOGGED_IN;
  payload: boolean;
}

interface SetTokenAction {
  type: ActionEnum.SET_TOKEN;
  payload: { access_token: string; expiry: number };
}

interface LogoutAction {
  type: ActionEnum.LOGOUT;
}

export type Actions =
  | SetUserAction
  | SetIsLoggedInAction
  | SetTokenAction
  | LogoutAction;

export const initialState: State = {
  user: null,
  token: null,
  isLoggedIn: false,
};

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case ActionEnum.SET_USER:
      localStorage.setItem("journey-user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };

    case ActionEnum.SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };

    case ActionEnum.SET_TOKEN:
      localStorage.setItem("journey-token", action.payload.access_token);
      return Object.assign({}, state, { token: action.payload });

    case ActionEnum.LOGOUT:
      localStorage.removeItem("journey-user");
      localStorage.removeItem("journey-token");
      return { ...initialState };

    default:
      return state;
  }
}

export default reducer;
