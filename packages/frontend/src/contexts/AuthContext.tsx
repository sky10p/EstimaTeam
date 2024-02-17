import { ReactNode, createContext, useContext, useEffect,useState } from "react";
import { authenticate } from "../firebase/firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export type AuthContextType = {
  anonymousLogged: string | null;
  setAnonymousLogged: (anonymousLogged: string | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
    anonymousLogged: null,
    setAnonymousLogged: () => {}
    });

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within a AuthProvider");
    }
    return context;
}

export type AuthProviderProps = {
    children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [anonymousLogged, setAnonymousLogged] = useState<string | null>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubcribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setAnonymousLogged(user.uid);
            } else {
                const anonymousUser = await authenticate();
                setAnonymousLogged(anonymousUser);
            }
        });

        return () => {
            unsubcribe();
        };
      
    }, []);

    const value = {
        anonymousLogged,
        setAnonymousLogged
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}