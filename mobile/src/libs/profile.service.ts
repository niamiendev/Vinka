
import { User } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { firestore } from "./firebase";

export async function createProfile(user: User) {
  try {
    const userRef = doc(firestore, "Profiles", user.uid);
    const snap = await getDoc(userRef);

    if (snap.exists()) return;

    const names = user.displayName?.trim().split(/\s+/) || ["", ""];

    const first_name = names[0] ?? "";
    const last_name = names.slice(1).join(" ");

    await setDoc(userRef, {
      user_id: user.uid,
      first_name,
      last_name,
      email: user.email ?? "",
      phone_number: user.phoneNumber ?? null,
      photo_url: user.photoURL ?? null,

      profession: null,
      phone_pro: null,
      email_pro: null,
      address: null,
      localisation: null,
      website: null,
      company: null,
      socials: {},

      created_at: serverTimestamp(),
    });

  } catch (error) {
    console.error("Error creating profile:", error);
  }
}

export async function getProfile(userId: string) {
  try {
    const userRef = doc(firestore, "Profiles", userId);
    const snap = await getDoc(userRef);

    if (!snap.exists()) return null;

    return snap.data();
  } catch (error) {
    console.error("Error getting profile:", error);
    return null;
  }
}
