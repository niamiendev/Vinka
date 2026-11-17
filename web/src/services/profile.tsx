
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/libs/firebase";
import type { PublicProfile } from "@/models/PublicProfile";

export async function getPublicProfile(
  userId: string
): Promise<PublicProfile | null> {
  try {
    const profileRef = doc(db, "Profiles", userId);
    const profileSnap = await getDoc(profileRef);

    if (!profileSnap.exists()) {
      return null;
    }

    const data = profileSnap.data();

    return {
      user_id: data.user_id,
      first_name: data.first_name,
      last_name: data.last_name,
      photo_url: data.photo_url ?? null,
      profession: data.profession ?? null,
      phone_pro: data.phone_pro ?? null,
      email_pro: data.email_pro ?? null,
      address: data.address ?? null,
      localisation: data.localisation ?? null,
      website: data.website ?? null,
      company: data.company ?? null,
      socials: data.socials ?? {},
    };
  } catch (error) {
    console.error("Erreur récupération du profil :", error);
    throw error;
  }
}
