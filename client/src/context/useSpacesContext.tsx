import { SpacesContext } from "@/context/SpacesContext";
import { useContext } from "react";

export function useSpacesContext() {
  const context = useContext(SpacesContext);
  if (context === null) {
    throw new Error(
      "useSpacesContext must be used within a SpacesContextProvider"
    );
  }
  return context;
}
