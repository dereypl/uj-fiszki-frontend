import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import React, {useContext, useState, useEffect, FC, ReactNode, createContext} from "react"
import {auth} from "../database/firebase";

interface AuthContextInterface {
    currentUser: any,
    login: (email: string, password: string) => Promise<any>,
    signup: (email: string, password: string) => Promise<any>,
    logout: () => Promise<any>
    resetPassword: (email: string) => Promise<any>
    updateEmail: (email: string) => any,
    updatePassword: (password: string) => any
}

const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface)

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [currentUser, setCurrentUser] = useState()
    console.log({currentUser});
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

    const updateEmail = (email: string) => {
        // @ts-ignore
        return currentUser.updateEmail(email)
    }

    const updatePassword = (password: string) => {
        // @ts-ignore
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        // @ts-ignore
        const unsubscribe = auth.onAuthStateChanged(user => {
            // @ts-ignore
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}