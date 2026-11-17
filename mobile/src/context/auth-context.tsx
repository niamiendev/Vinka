import { User } from "firebase/auth";
import { createContext } from "react";

type AuthType = {
    loading: boolean
    user: User | null
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthType | null>(null)

