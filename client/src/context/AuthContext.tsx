import { ReactNode, createContext, useState } from "react";

interface ContextValues {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

interface ContextProviderprops {
  children: ReactNode;
}

export const AuthContext = createContext<ContextValues | null>(null);

function AuthContextProvider({ children }: ContextProviderprops) {
  const [user, setUser] = useState("archer");

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
