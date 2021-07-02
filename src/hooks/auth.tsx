import { createContext, FC, useCallback, useContext, useState } from "react";

import { auth, firebase } from "../services/firebase";

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface IAuthContextData {
  user: User | undefined;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(() => {
    const storagedUser = localStorage.getItem("@letmeask:user");

    return storagedUser && JSON.parse(storagedUser);
  });

  const signInWithGoogle = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const response = await auth.signInWithPopup(provider);

    if (response.user) {
      const { displayName, photoURL, email, uid } = response.user;

      if (!email && !displayName) {
        throw new Error("Missing information from Google Account.");
      }

      const data = {
        name: displayName || email!,
        avatar: photoURL!,
        id: uid,
      };

      localStorage.setItem("@letmeask:user", JSON.stringify(data));

      setUser(data);
    }
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem("@letmeask:user");

    setUser(undefined);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IAuthContextData => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
