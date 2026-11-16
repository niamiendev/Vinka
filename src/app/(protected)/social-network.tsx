import XButton from '@/components/XButton'
import XColumn from '@/components/XColumn'
import XRow from '@/components/XRow'
import XScreen from '@/components/XScreen'
import XText from '@/components/XText'
import useAuth from '@/hooks/useAuth'
import { firestore } from '@/libs/firebase'
import { ProfileItem } from '@/models/profile-item'
import { SOCIALS, SocialKey } from '@/utils/socials'
import { colors } from '@/utils/theme'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native'

type Links = Partial<Record<SocialKey, string>>

const SocialsScreen = () => {
  const { user } = useAuth()
  const [links, setLinks] = useState<Links>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) return
    getDoc(doc(firestore, 'Profiles', user.uid))
      .then((snap) => {
        if (snap.exists()) setLinks((snap.data() as ProfileItem).socials ?? {})
      })
      .catch(console.error)
  }, [user])

  const setLink = (key: SocialKey, value: string) =>
    setLinks((prev) => ({ ...prev, [key]: value }))

  const handleSave = async () => {
    if (!user) return

    // On ne garde que les champs remplis
    const cleaned: Links = {}
    for (const { key } of SOCIALS) {
      const value = links[key]?.trim()
      if (value) cleaned[key] = value
    }

    try {
      setLoading(true)
      await updateDoc(doc(firestore, 'Profiles', user.uid), { socials: cleaned })
      Alert.alert('Succès', 'Réseaux sociaux enregistrés.')
      router.back()
    } catch (e) {
      console.error(e)
      Alert.alert('Erreur', "Impossible d'enregistrer les liens.")
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
        <XRow width={"100%"} style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={10} style={styles.back}>
            <Ionicons name="arrow-back" size={24} color={colors.textGrey} />
          </Pressable>
          <XText fontSize={18} fontWeight={700} textAlign="center">
            Réseaux sociaux
          </XText>
        </XRow>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <XText fontSize={16} fontWeight={700} textAlign="center">
            Ajoutez vos liens
          </XText>

          <XColumn style={styles.list}>
            {SOCIALS.map((s) => (
              <XRow key={s.key} style={styles.row}>
                <View style={[styles.iconCircle, { backgroundColor: s.color }]}>
                  <Ionicons
                    name={s.icon}
                    size={20}
                    color={'iconColor' in s ? s.iconColor : 'white'}
                  />
                </View>

                <View style={styles.rowContent}>
                  <XText fontSize={15} fontWeight={600}>
                    {s.label}
                  </XText>
                  <TextInput
                    value={links[s.key] ?? ''}
                    onChangeText={(v) => setLink(s.key, v)}
                    placeholder={s.placeholder}
                    placeholderTextColor={colors.textGrey}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                  />
                </View>
              </XRow>
            ))}
          </XColumn>

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

export default SocialsScreen

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    //height: 56,
    justifyContent: 'center',
    paddingHorizontal: 0,
    //paddingBottom: 16,
    //backgroundColor: colors.ternary,
  },
  back: { position: 'absolute', left: 16, zIndex: 1 },
  content: { paddingHorizontal: 16, paddingVertical: 16, paddingBottom: 32 },
  list: { marginTop: 24, marginBottom: 24, gap: 18 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContent: { flex: 1 },
  input: {
    padding: 0,
    paddingVertical: 4,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.ternary,
  },
})