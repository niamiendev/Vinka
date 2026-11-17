
export const SOCIALS = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    color: "#25D366",
    placeholder: "+225 07 00 00 00 00",
  },
  /*{
    key: "linkedin",
    label: "LinkedIn",
    color: "#0A66C2",
    placeholder: "Lien du profil",
  },*/
  {
    key: "instagram",
    label: "Instagram",
    color: "#E1306C",
    placeholder: "@pseudo",
  },
  {
    key: "facebook",
    label: "Facebook",
    color: "#1877F2",
    placeholder: "Lien du profil",
  },
  {
    key: "tiktok",
    label: "TikTok",
    color: "#000000",
    placeholder: "@pseudo",
  },
  {
    key: "x",
    label: "X",
    color: "#000000",
    placeholder: "@pseudo",
  },
  {
    key: "youtube",
    label: "YouTube",
    color: "#FF0000",
    placeholder: "Lien de la chaîne",
  },
  {
    key: "telegram",
    label: "Telegram",
    color: "#229ED9",
    placeholder: "@pseudo",
  },
  {
    key: "github",
    label: "GitHub",
    color: "#181717",
    placeholder: "@pseudo",
  },
  {
    key: "snapchat",
    label: "Snapchat",
    color: "#FFFC00",
    iconColor: "#000000",
    placeholder: "@pseudo",
  },
] as const;

export type SocialKey = (typeof SOCIALS)[number]["key"];
