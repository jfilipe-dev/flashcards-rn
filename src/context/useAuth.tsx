import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactChild,
  useEffect,
} from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import firebaseConfig from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  currentUser: User | null;
  loading: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): void;
  register(email: string, password: string): Promise<void>;
}

initializeApp(firebaseConfig);
const auth = getAuth();

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactChild }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const register = useCallback(async (email: string, password: string) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await AsyncStorage.setItem("@flashcards-user", JSON.stringify(user));
    setCurrentUser(user);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    await AsyncStorage.setItem("@flashcards-user", JSON.stringify(user));
    setCurrentUser(user);
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);

    AsyncStorage.removeItem("@flashcards-user");
    setCurrentUser(null);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("@flashcards-user")
      .then((user) => {
        if (user) {
          console.log("tem user");
          setCurrentUser(JSON.parse(user));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        register,
        currentUser,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within as Authprovider");
  }

  return context;
}
