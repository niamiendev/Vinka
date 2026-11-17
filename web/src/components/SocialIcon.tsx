
import {
  SiWhatsapp,
  //SiLinkedin,
  SiInstagram,
  SiFacebook,
  SiTiktok,
  SiX,
  SiYoutube,
  SiTelegram,
  SiGithub,
  SiSnapchat,
} from "react-icons/si";

import type { SocialKey } from "@/constants/socials";

const ICONS = {
  whatsapp: SiWhatsapp,
  //linkedin: SiLinkedin,
  instagram: SiInstagram,
  facebook: SiFacebook,
  tiktok: SiTiktok,
  x: SiX,
  youtube: SiYoutube,
  telegram: SiTelegram,
  github: SiGithub,
  snapchat: SiSnapchat,
};

type Props = {
  social: SocialKey;
  color?: string;
  size?: number;
};

export default function SocialIcon({
  social,
  color,
  size = 22,
}: Props) {
  const Icon = ICONS[social];

  return (
    <Icon
      size={size}
      color={color}
      aria-hidden="true"
    />
  );
}
