export enum ActionEnum {
  SET_USER = "SET_USER",
  SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN",
}

export interface State {
  user: string | null;
  isLoggedIn: boolean;
}

interface SetUserAction {
  type: ActionEnum.SET_USER;
  payload: string | null;
}

interface SetIsLoggedInAction {
  type: ActionEnum.SET_IS_LOGGED_IN;
  payload: boolean;
}

export type Actions = SetUserAction | SetIsLoggedInAction;

export const initialState: State = {
  user: "",
  isLoggedIn: false,
};

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case ActionEnum.SET_USER:
      return Object.assign({}, state, { user: action.payload });

    case ActionEnum.SET_IS_LOGGED_IN:
      return Object.assign({}, state, { isLoggedIn: action.payload });

    default:
      return state;
  }
}

export default reducer;
