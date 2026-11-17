import Ionicons from '@expo/vector-icons/Ionicons'

export const SOCIALS = [
  { key: 'whatsapp', label: 'WhatsApp', icon: 'logo-whatsapp', color: '#25D366', placeholder: '+225 07 00 00 00 00' },
  { key: 'linkedin', label: 'LinkedIn', icon: 'logo-linkedin', color: '#0A66C2', placeholder: 'Lien du profil' },
  { key: 'instagram', label: 'Instagram', icon: 'logo-instagram', color: '#E1306C', placeholder: '@pseudo' },
  { key: 'facebook', label: 'Facebook', icon: 'logo-facebook', color: '#1877F2', placeholder: 'Lien du profil' },
  { key: 'tiktok', label: 'TikTok', icon: 'logo-tiktok', color: '#000000', placeholder: '@pseudo' },
  { key: 'x', label: 'X', icon: 'logo-twitter', color: '#000000', placeholder: '@pseudo' },
  { key: 'youtube', label: 'YouTube', icon: 'logo-youtube', color: '#FF0000', placeholder: 'Lien de la chaîne' },
  { key: 'telegram', label: 'Telegram', icon: 'paper-plane', color: '#229ED9', placeholder: '@pseudo' },
  { key: 'github', label: 'GitHub', icon: 'logo-github', color: '#181717', placeholder: '@pseudo' },
  { key: 'snapchat', label: 'Snapchat', icon: 'logo-snapchat', color: '#FFFC00', iconColor: '#000000', placeholder: '@pseudo' },
] as const satisfies ReadonlyArray<{
  key: string
  label: string
  icon: keyof typeof Ionicons.glyphMap
  color: string
  iconColor?: string
  placeholder: string
}>

export type SocialKey = (typeof SOCIALS)[number]['key']