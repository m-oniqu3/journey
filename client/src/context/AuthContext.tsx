import reducer, { Actions, State, initialState } from "@/context/reducer";
import { ReactNode, createContext, useEffect, useReducer } from "react";

interface ContextValues {
  state: State;
  dispatch: React.Dispatch<Actions>;
}

interface ContextProviderprops {
  children: ReactNode;
}

export const AuthContext = createContext<ContextValues | null>(null);

function AuthContextProvider({ children }: ContextProviderprops) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
