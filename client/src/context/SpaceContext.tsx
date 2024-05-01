import { ReactNode } from "react";
import { createContext } from "vm";

interface ContextProviderProps {
  children: ReactNode;
}

export const SpaceContext = createContext();

function SpaceContextProvider({ children }: ContextProviderProps) {
  return (
    <SpaceContext.Provider value={{ type: "space" }}>
      {children}
    </SpaceContext.Provider>
  );
}

export default SpaceContextProvider;
