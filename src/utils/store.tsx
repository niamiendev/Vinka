export const onboardings = [
  {
    id: 1,
    image: require('@/assets/images/logo.png'),
    title: 'Votre carte\nde visite numérique',
    description: 'Partagez vos informations\n professionnelles en un clic.',
  },
  {
    id: 2,
    image: require('@/assets/images/qrcode.png'),
    title: 'Partagez facilement\navec un QR code',
    description: 'Un scan suffit pour découvrir\nvotre carte.',
  },
  {
    id: 3,
    image: require('@/assets/images/social.png'),
    title: 'Centralisez vos\nréseaux sociaux',
    description: 'Tous vos liens professionnels au même\nendroit.',
  },
];

export const getErrorMessage = (error: unknown): string => {
  const code = (error as { code?: string })?.code
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email ou mot de passe incorrect.'
    case 'auth/invalid-email':
      return 'Adresse email invalide.'
    case 'auth/email-already-in-use':
      return 'Cet email est déjà utilisé.'
    case 'auth/weak-password':
      return 'Mot de passe trop faible (6 caractères minimum).'
    case 'auth/too-many-requests':
      return 'Trop de tentatives. Réessaie plus tard.'
    case 'auth/network-request-failed':
      return 'Erreur réseau. Vérifie ta connexion internet.'
    default:
      return 'Une erreur est survenue. Réessaie.'
  }
}