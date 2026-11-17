import { XQrcode } from '@/components/qrcode/XQrCode'
import XButton from '@/components/XButton'
import XColumn from '@/components/XColumn'
import XRow from '@/components/XRow'
import XScreen from '@/components/XScreen'
import XSpace from '@/components/XSpace'
import XText from '@/components/XText'
import useAuth from '@/hooks/useAuth'
import { getProfile } from '@/libs/profile.service'
import { ProfileItem } from '@/models/profile-item'
import { colors } from '@/utils/theme'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

const QRCodedeScreen = () => {

  const { user } = useAuth()
  const [profile, setProfile] = useState<ProfileItem | null>(null);
  const router = useRouter();
  const [isReady, setIsReady] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      try {
        const data = (await getProfile(user.uid)) as ProfileItem | null;

        if (data) {
          setProfile(data);
          setIsReady(false)
        }
      } catch (error) {
        console.error("Erreur chargement profil :", error);
      }
    }

    fetchProfile();
  }, [user?.uid]);

  const handlBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    }

  }
  const handleDownloadPress = () => {

  }
  const handleSavePress = () => {

  }
  const handleSharePress = () => {

  }

  return (
    isReady ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View >
    ) : (
      <XScreen style={{ flex: 1 }}>
        {/* HEARDER */}
        <XRow justifyContent="space-between" width="100%">
          <Ionicons onPress={handlBackPress} name="arrow-back-outline" size={24} color="black" />

          <XText fontSize={18} fontWeight={700} textAlign="center">
            Mon QR Code
          </XText>
          <Ionicons onPress={handleSharePress} name="share-social-outline" size={24} color="black" />
        </XRow>
        <XSpace height={32} />

        {/* CARD */}

        <XColumn width="100%" gap={12}

          backgroundColor={colors.background}
          style={{ paddingTop: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16, }}
        >
          <XQrcode size={200} />
          <XSpace height={8} />

          <XColumn style={{ alignItems: "center", gap: 12 }}>
            <XText textAlign='center' fontSize={24} fontWeight={900} color={colors.text}  >
              {
                profile?.first_name && profile?.last_name ?
                  `${profile.first_name} ${profile.last_name}` :
                  user?.displayName || 'Nom non spécifié'
              }
            </XText>
            <XText textAlign='center' fontSize={16} fontWeight={500} color={colors.text}  >
              Scannez pour découvrir ma carte.
            </XText>
          </XColumn>
          <XSpace height={24} />
          <XButton width="100%" backgroundColor={colors.ternary} onPress={handleDownloadPress}>
            <XRow gap={8} >
              <Ionicons name="download-outline" size={24} color={colors.text} />
              <XText color={colors.text} fontWeight={"700"}>Télécharger</XText>
            </XRow>
          </XButton>
          <XButton width="100%" backgroundColor={colors.ternary} onPress={handleSharePress}>
            <XRow gap={8} >
              <Ionicons name="share-social-outline" size={24} color={colors.text} />
              <XText color={colors.text} fontWeight={"700"}>Partager ma carte</XText>
            </XRow>
          </XButton>
          <XButton width="100%" backgroundColor={colors.ternary} onPress={handleSavePress}>
            <XRow gap={8} >
              <Ionicons name="save-outline" size={24} color={colors.text} />
              <XText color={colors.text} fontWeight={"700"}>Enregistrer dans la galerie</XText>
            </XRow>
          </XButton>
        </XColumn>

      </XScreen>
    )
  )
}

export default QRCodedeScreen

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  }
})