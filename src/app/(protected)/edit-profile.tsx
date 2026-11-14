import XButton from '@/components/XButton'
import XField from '@/components/XField'
import XRow from '@/components/XRow'
import XScreen from '@/components/XScreen'
import XText from '@/components/XText'
import useAuth from '@/hooks/useAuth'
import { firestore, storage } from '@/libs/firebase'
import { ProfileItem } from '@/models/profile-item'
import { colors } from '@/utils/theme'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useEffect, useState } from 'react'
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native'

const EditProfileScreen = () => {
  const { user } = useAuth()

  const [fullName, setFullName] = useState('')
  const [profession, setProfession] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [localisation, setLocalisation] = useState('')
  const [photo, setPhoto] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) return
    getDoc(doc(firestore, 'Profiles', user.uid))
      .then((snap) => {
        if (!snap.exists()) return
        const p = snap.data() as ProfileItem
        setFullName(`${p.first_name ?? ''} ${p.last_name ?? ''}`.trim())
        setProfession(p.profession ?? '')
        setCompany(p.company ?? '')
        setPhone(p.phone_pro ?? '')
        setEmail(p.email_pro ?? p.email ?? '')
        setLocalisation(p.localisation ?? '')
        setPhoto(p.photo_url)
      })
      .catch(console.error)
  }, [user])

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!perm.granted) {
      Alert.alert('Permission refusée', "Autorise l'accès aux photos dans les réglages.")
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    })
    if (!result.canceled) setPhoto(result.assets[0].uri)
  }

  const handleSave = async () => {
    if (!user) return
    if (!fullName.trim()) {
      Alert.alert('Erreur', 'Le nom est obligatoire.')
      return
    }

    try {
      setLoading(true)

      let photo_url = photo
      // Une nouvelle image locale (file://...) doit être envoyée sur Storage
      if (photo && !photo.startsWith('http')) {
        const blob = await (await fetch(photo)).blob()
        const storageRef = ref(storage, `profiles/${user.uid}.jpg`)
        await uploadBytes(storageRef, blob)
        photo_url = await getDownloadURL(storageRef)
      }

      const [first = '', ...rest] = fullName.trim().split(/\s+/)

      await updateDoc(doc(firestore, 'Profiles', user.uid), {
        first_name: first,
        last_name: rest.join(' '),
        profession: profession.trim() || null,
        company: company.trim() || null,
        phone_pro: phone.trim() || null,
        email_pro: email.trim() || null,
        localisation: localisation.trim() || null,
        photo_url,
      })

      Alert.alert('Succès', 'Profil mis à jour.')
      router.back()
    } catch (e) {
      console.error(e)
      Alert.alert('Erreur', "Impossible d'enregistrer le profil.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <XScreen paddingHorizontal={0} style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <XRow justifyContent='space-between' width={"100%"} style={{ paddingHorizontal:16 }}>
          <Ionicons name="arrow-back" size={24} color={colors.textGrey}
          onPress={() => router.back()}
          />
          <XText fontSize={18} fontWeight={700} textAlign="center">
            Modifier mon profil
          </XText>
          <Ionicons name="git-network" size={24} color={colors.textGrey} 
          onPress={() => router.navigate("/(protected)/social-network")} />
        </XRow>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar */}
          <View style={styles.avatarWrapper}>
            <Pressable onPress={pickImage}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarEmpty]}>
                  <Ionicons name="person" size={56} color={colors.textGrey} />
                </View>
              )}
              <View style={styles.camera}>
                <Ionicons name="camera" size={18} color="white" />
              </View>
            </Pressable>
          </View>

          <View style={styles.form}>
            <XField label="Nom complet" value={fullName} onChangeText={setFullName} autoCapitalize="words" />
            <XField label="Profession" value={profession} onChangeText={setProfession} />
            <XField label="Entreprise" value={company} onChangeText={setCompany} />
            <XField
              label="Téléphone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoComplete="tel"
            />
            <XField
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <XField
              label="Localisation"
              value={localisation}
              onChangeText={setLocalisation}
              rightIcon="chevron-down"
            />
          </View>

          <XButton width="100%" loading={loading} onPress={handleSave}>
            <XText fontSize={16} fontWeight={700} color="white">
              Enregistrer
            </XText>
          </XButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </XScreen>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  screen: { flex: 1, },
  header: {
    height: 56,
    justifyContent: 'center',
  },
  back: { position: 'absolute', left: 24, zIndex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 32 },
  avatarWrapper: { alignItems: 'center', marginVertical: 16 },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  avatarEmpty: {
    backgroundColor: colors.ternary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    position: 'absolute',
    right: -4,
    bottom: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: { gap: 12, marginBottom: 24 },
})