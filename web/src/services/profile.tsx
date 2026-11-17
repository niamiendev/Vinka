
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/libs/firebase";

export async function getPublicProfile(userId: string) {

  const profileRef = doc(db, "Profiles", userId);
  const profileSnap = await getDoc(profileRef);

  if (!profileSnap.exists()) {
    return null;
  }

  return profileSnap.data();
}
