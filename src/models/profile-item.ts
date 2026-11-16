import { SocialKey } from "@/utils/socials";
import { FieldValue } from "firebase/firestore";

export type ProfileItem = {
  user_id: string;

  // me
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  photo_url: string | null;

  //pro
  profession: string | null;
  phone_pro: string | null;
  email_pro: string | null;
  address: string | null;
  localisation: string | null;
  website: string | null;
  company: string | null;
  socials: Partial<Record<SocialKey, string>>;
  created_at: FieldValue;
};
