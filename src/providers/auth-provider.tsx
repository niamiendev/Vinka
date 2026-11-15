import { AuthContext } from '@/context/auth-context'
<<<<<<< HEAD
import { auth, firestore } from '@/libs/firebase'
import { getErrorMessage } from '@/utils/store'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ReactNode, useEffect, useRef, useState } from 'react'

const splitName = (fullName: string) => {
  const [first = '', ...rest] = fullName.trim().split(/\s+/)
  return { first, last: rest.join(' ') }
}

/*const buildProfile = (user: User, fullName?: string): ProfileItem => {
  const { first, last } = splitName(fullName ?? user.displayName ?? '')

  return {
    user_id: user.uid,
    first_name: first,
    last_name: last,
    email: user.email ?? '',
    phone_number: user.phoneNumber,
    photo_url: user.photoURL,

    profession: null,
    phone_pro: null,
    email_pro: null,
    address: null,
    localisation: null,
    company: null,
    socials: {},

    created_at: serverTimestamp(),
  }
}*/

const fetchOrCreateProfile = async (user: User): Promise<void> => {
  const userRef = doc(firestore, 'Profiles', user.uid)
  const snap = await getDoc(userRef)

  if (snap.exists()) return

  //await setDoc(userRef, buildProfile(user))
}
=======
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

>>>>>>> d645a6c86e3e136b19af7108463f689c36188268

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
<<<<<<< HEAD
  const registering = useRef(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Inscription en cours : register() crée le profil puis met à jour user
      if (registering.current) return

      try {
        if (firebaseUser) await fetchOrCreateProfile(firebaseUser)
      } catch (e) {
        console.error(e)
      } finally {
        setUser(firebaseUser)
=======

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {

      try {

        if (firebaseUser) { setUser(firebaseUser) }
        
      } catch (e) {
        console.error(e)
      } finally {
>>>>>>> d645a6c86e3e136b19af7108463f689c36188268
        setLoading(false)
      }
    })
    return unsubscribe
  }, [])

<<<<<<< HEAD
=======
  // login
>>>>>>> d645a6c86e3e136b19af7108463f689c36188268
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

<<<<<<< HEAD
  const register = async (email: string, password: string, name?: string) => {
    try {
      registering.current = true

      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password)

      // 1. Le profil d'abord, avec le vrai nom
      await setDoc(
        doc(firestore, 'Profiles', credential.user.uid),
        {}
        //buildProfile(credential.user, name)
      )

      // 2. Puis le displayName dans Firebase Auth
=======
  // register
  const register = async (email: string, password: string, name?: string) => {
    try {

      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password)

>>>>>>> d645a6c86e3e136b19af7108463f689c36188268
      if (name?.trim()) {
        await updateProfile(credential.user, { displayName: name.trim() })
      }

<<<<<<< HEAD
      // 3. Le profil existe : on déclenche la redirection
      setUser(credential.user)
    } catch (error) {
      if (auth.currentUser) await signOut(auth).catch(() => { })
      throw new Error(getErrorMessage(error))
    } finally {
      registering.current = false
    }
  }

=======
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
>>>>>>> d645a6c86e3e136b19af7108463f689c36188268
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