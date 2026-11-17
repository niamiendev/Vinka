import { SocialKey } from "../constants/socials";

export type PublicProfile = {
  user_id: string;
  first_name: string;
  last_name: string;
  photo_url: string | null;
  profession: string | null;
  phone_pro: string | null;
  email_pro: string | null;
  address: string | null;
  localisation: string | null;
  website: string | null;
  company: string | null;
  socials: Partial<Record<SocialKey, string>>;
};