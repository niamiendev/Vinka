import { XQrcode } from '@/components/qrcode/XQrCode'
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
import { ActivityIndicator, Image, Pressable, StyleSheet, View } from 'react-native'

const CardScreen = () => {

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

  const handleProfilePress = () => {
    router.push('/(protected)/edit-profile');
  }
  const handleMyCardPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  }

  return (
    isReady ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View >
    ) : (
      <XScreen style={{ flex: 1 }}>
        {/* HEARDER */}
        <XRow>
          <XText fontSize={24} fontWeight={900} textAlign="center">
            Ma carte
          </XText>
          <Ionicons onPress={handleProfilePress} name="share-social-outline" size={24} color="black" />
        </XRow>
        <XSpace height={24} />

        {/* CARD */}
        <XColumn
          width="100%" backgroundColor={colors.purple}
          style={{ borderRadius: 16, paddingVertical: 16 }}
        >
          {
            profile?.photo_url ? (
              <Image
                source={{ uri: profile?.photo_url }}
                style={styles.image}
              />
            ) : (
              <Ionicons
                style={{ width: 150, height: 150, borderRadius: 100, backgroundColor: 'lightgray', textAlign: 'center', lineHeight: 82 }}
                name="person-outline"
                size={32}
                color="gray"
              />
            )
          }
          <XColumn
            width={"100%"}
            gap={2}
            backgroundColor={colors.background}
            style={{ height: "100%", marginTop: 24, paddingTop: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16, }}
          >
            <XText fontSize={25} fontWeight={800} color={colors.text}  >
              {
                profile?.first_name && profile?.last_name ?
                  `${profile.first_name} ${profile.last_name}` :
                  user?.displayName || 'Nom non spécifié'
              }
            </XText>
            <XText fontSize={22} fontWeight={500} color={colors.text}  >
              {
                profile?.profession ?
                  profile.profession : user?.displayName ? 'Profession non spécifiée' : 'Profession non spécifiée'
              }
            </XText>
            <XText fontSize={16} color={colors.text}  >
              {
                profile?.company ? profile.company : 'Entreprise non spécifiée'
              }
            </XText>
            <Pressable>
              <XText fontSize={14} color={colors.purple} textAlign="center" style={{ marginTop: 8, textDecorationLine: 'underline' }}
                onPress={handleMyCardPress}
              >
                Retour à page d'accueil
              </XText>
            </Pressable>

            <XSpace height={16} />
            <XColumn width="100%" style={{ paddingHorizontal: 32 }} gap={16} >
              <XRow gap={24} width="100%" justifyContent="flex-start" style={{ marginTop: 16 }} >
                <Ionicons name="call-outline" size={24} color={colors.text} />
                <XText color={colors.text}  >{profile?.phone_pro || 'Téléphone non spécifié'}</XText>
              </XRow>
              <XRow gap={24} width="100%" justifyContent="flex-start"  >
                <Ionicons name="mail-outline" size={24} color={colors.text} />
                <XText color={colors.text}  >{profile?.email || 'Email non spécifié'}</XText>
              </XRow>
              <XRow gap={24} width="100%" justifyContent="flex-start" >
                <Ionicons name="globe-outline" size={24} color={colors.text} />
                <XText color={colors.text}  >{profile?.website || 'Site web non spécifié'}</XText>
              </XRow>
              <XRow gap={24} width="100%" justifyContent="flex-start"  >
                <Ionicons name="location-outline" size={24} color={colors.text} />
                <XText color={colors.text}  >{profile?.address || 'Adresse non spécifiée'}</XText>
              </XRow>
            </XColumn>
            <XSpace height={16} />

            <XQrcode size={100} />

            { /* STATS */}
            <XRow width="100%" justifyContent="space-between" style={{ paddingTop: 24 }} >
              <XRow backgroundColor={colors.background} width="50%" justifyContent="center"  >
                <XRow gap={12} >
                  <Ionicons name="eye-outline" size={24} color={colors.purple} />
                  <XColumn gap={5}>
                    <XText color={colors.purple} fontWeight={900} >1.2K</XText>
                    <XText color={colors.purple} >Scans</XText>
                  </XColumn>
                </XRow>
              </XRow>
              <XRow backgroundColor={colors.background} width="50%" justifyContent="center"  >
                <XRow gap={12}>
                  <Ionicons name="share-social-outline" size={24} color={colors.purple} />
                  <XColumn gap={5}>
                    <XText color={colors.purple} fontWeight={900} >245</XText>
                    <XText color={colors.purple} >Paratges</XText>
                  </XColumn>
                </XRow>
              </XRow>
            </XRow>
          </XColumn>

        </XColumn>
      </XScreen>
    )
  )
}

export default CardScreen

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  }
})