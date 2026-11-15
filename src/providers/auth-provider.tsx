import { AuthContext } from '@/context/auth-context'

import { auth } from '@/libs/firebase'
import { createProfile } from '@/libs/profile.service'
import { getErrorMessage } from '@/utils/store'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth'
import { ReactNode, useEffect, useState } from 'react'

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {

      try {

        if (firebaseUser) { setUser(firebaseUser) }
        
      } catch (e) {
        console.error(e)
      } finally {

        setLoading(false)
      }
    })
    return unsubscribe
  }, [])



  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }


  const register = async (email: string, password: string, name?: string) => {
    try {

      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password)


      if (name?.trim()) {
        await updateProfile(credential.user, { displayName: name.trim() })
      }

      if (credential.user) {
        await createProfile(credential.user)
      }

      setUser(credential.user)

    } catch (error) {
      if (auth.currentUser) await signOut(auth).catch(() => { })
      throw new Error(getErrorMessage(error))
    } finally {}
  }

  // logout

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  return (
    <AuthContext.Provider value={{ loading, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}