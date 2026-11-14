import XButton from '@/components/XButton'
import XColumn from '@/components/XColumn'
import XInput from '@/components/XInput'
import XScreen from '@/components/XScreen'
import XSpace from '@/components/XSpace'
import XText from '@/components/XText'
import useAuth from '@/hooks/useAuth'
import { colors } from '@/utils/theme'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { logout } = useAuth()

  const handleSend = async () => {
    if (!email.trim()) {
      Alert.alert('Erreur', 'Merci de saisir ton email.')
      return
    }
    try {
      setLoading(true)
      Alert.alert('Email envoyé', 'Vérifie ta boîte de réception.')
      await logout()
    } catch (error) {
      Alert.alert('Erreur', "" + error)

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
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Image style={{ alignSelf: "center", height: 150 }} resizeMode='center' source={require("@/assets/images/icon-light.png")} />
          <Pressable style={styles.back} onPress={() => router.back()} hitSlop={10}>
            <Ionicons name="arrow-back" size={24} color={colors.textGrey} />
          </Pressable>

          <XColumn style={styles.header}>
            <XText fontSize={32} fontWeight={900} textAlign="center">
              Mot de passe oublié ?
            </XText>
            <XText fontSize={14} textAlign="center">
              Entre ton email et nous t'enverrons un lien pour réinitialiser ton mot de passe.
            </XText>
          </XColumn>

          <XInput
            icon="mail-outline"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <XSpace height={32} />
          <XButton width="100%" loading={loading} onPress={handleSend}>
            <XText fontSize={16} fontWeight={700} color="white">
              Envoyer le lien
            </XText>
          </XButton>

          <XSpace height={24} />
          <Pressable style={styles.footer} onPress={() => router.back()}>
            <XText fontSize={14} fontWeight={700} color={colors.primary}>
              Retour à la connexion
            </XText>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </XScreen>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  back: { position: 'absolute', top: 16, left: 24 },
  header: { alignItems: 'center', gap: 8, marginBottom: 40 },
  footer: { alignItems: 'center' },
})