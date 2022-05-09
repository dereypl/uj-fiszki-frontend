import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import React, {createContext, FC, ReactNode, useContext, useEffect, useState} from "react"
import {auth} from "../database/firebase";
import {User} from "@firebase/auth";

interface AuthContextInterface {
    currentUser: User,
    login: (email: string, password: string) => ReturnType<typeof signInWithEmailAndPassword>,
    signup: (email: string, password: string) => ReturnType<typeof createUserWithEmailAndPassword>,
    logout: () => ReturnType<typeof signOut>
    resetPassword: (email: string) => ReturnType<typeof sendPasswordResetEmail>
}

const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface)

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [currentUser, setCurrentUser] = useState<User>()
    const [loading, setLoading] = useState(true)

    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const resetPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email)
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user as User)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser: currentUser as User,
        login,
        signup,
        logout,
        resetPassword,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}