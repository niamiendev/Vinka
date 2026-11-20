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
import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'

import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";


const HomeScreen = () => {

  const { user } = useAuth()
  const [profile, setProfile] = useState<ProfileItem | null>(null);
  const router = useRouter();
  const [isReady, setIsReady] = useState(true);
  const qrRef = useRef<any>(null);

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


  {/*  share */}
  const handleShareQRCode = async () => {
    try {
      if (!qrRef.current?.capture) return;

      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        console.log("Le partage n'est pas disponible.");
        return;
      }

      const uri = await qrRef.current.capture();

      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
        dialogTitle: "Partager mon QR code VIKA",
        UTI: "public.png",
      });
    } catch (error) {
      console.error("Erreur de partage du QR code :", error);
    }
  };

  const handleProfilePress = () => {
    router.push('/(protected)/edit-profile');
  }
  const handleMyCardPress = () => {
    router.push('/(protected)/carte');
  }
  const handleMyQRCodePress = () => {
    router.push('/(protected)/qrcode');
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
          <XText fontSize={24} fontWeight={700} textAlign="center">
            Bonjour, {profile?.first_name || user?.displayName || 'utilisateur'}
          </XText>
          <Ionicons onPress={handleProfilePress} name="person-outline" size={24} color="black" />
        </XRow>
        <XSpace height={12} />
        <XText fontSize={16} > Votre réseau, à portée de main.</XText>
        <XSpace height={32} />

        {/* CARD */}
        <XColumn
          width="100%" backgroundColor={colors.purple}
          style={{ borderRadius: 16 }}
        >
          <XRow gap={16} width="100%" justifyContent="flex-start" padding={16}
          >
            {
              profile?.photo_url ? (
                <Image
                  source={{ uri: profile?.photo_url }}
                  style={styles.image}
                />
              ) : (
                <Ionicons
                  style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'lightgray', textAlign: 'center', lineHeight: 82 }}
                  name="person-outline"
                  size={32}
                  color="gray"
                />
              )
            }
            <XColumn style={{ justifyContent: "center", alignItems: "flex-start", gap: 2 }}>
              <XText fontSize={24} fontWeight={700} color={colors.white}  >
                {
                  profile?.first_name && profile?.last_name ?
                    `${profile.first_name} ${profile.last_name}` :
                    user?.displayName || 'Nom non spécifié'
                }
              </XText>
              <XText fontSize={18} fontWeight={500} color={colors.white}  >
                {
                  profile?.profession ?
                    profile.profession : user?.displayName ? 'Profession non spécifiée' : 'Profession non spécifiée'
                }
              </XText>
              <XText fontSize={16} fontWeight={500} color={colors.white}  >
                {
                  profile?.company ? profile.company : 'Entreprise non spécifiée'
                }
              </XText>
            </XColumn>
          </XRow>

          <XColumn width="100%" gap={8}
            backgroundColor={colors.background}
            style={{ paddingTop: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16, }}
          >
            <XSpace height={8} />
            <ViewShot
              ref={qrRef}
              options={{ format: "png", quality: 1 }}
              style={{ backgroundColor: "#fff", padding: 16, alignItems: "center" }}
            >
              <XQrcode size={150} />
            </ViewShot>
            <XSpace height={8} />

            <XButton width="100%" backgroundColor={colors.ternary} onPress={handleShareQRCode} >
              <XRow gap={8} >
                <Ionicons name="share-social-outline" size={24} color={colors.text} />
                <XText color={colors.text}  >Partager ma carte</XText>
              </XRow>
            </XButton>
            <XButton width="100%" backgroundColor={colors.secondary} onPress={handleMyCardPress}>
              <XRow gap={8} >
                <Ionicons name="card-outline" size={24} color={colors.text} />
                <XText color={colors.text} >Voir ma carte</XText>
              </XRow>
            </XButton>
            <XButton bordered width="100%" backgroundColor={colors.background} onPress={handleMyQRCodePress}>
              <XRow gap={8} >
                <Ionicons name="qr-code-outline" size={24} color={colors.purple} />
                <XText color={colors.purple} >Mon QR Code</XText>
              </XRow>
            </XButton>
          </XColumn>

          {/*<XRow width="100%" justifyContent="space-between" backgroundColor={colors.background} style={{ paddingTop: 24 }} >
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
          </XRow>*/}
        </XColumn>
      </XScreen>
    )
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  }
})