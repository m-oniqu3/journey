import spacesReducer, {
  SpaceActions,
  SpacesState,
  initalSpacesState,
} from "@/context/spaces-reducer";
import { ReactNode, createContext, useEffect, useReducer } from "react";

type ContextValues = {
  state: SpacesState;
  dispatch: React.Dispatch<SpaceActions>;
};

export const SpacesContext = createContext<ContextValues | null>(null);

type ContextProviderProps = {
  children: ReactNode;
};

function SpacesContextProvider(props: ContextProviderProps) {
  const [state, dispatch] = useReducer(spacesReducer, initalSpacesState);

  useEffect(() => {
    console.log(state.userspaces);
  }, [state]);

  return (
    <SpacesContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SpacesContext.Provider>
  );
}

export default SpacesContextProvider;
