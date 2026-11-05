import XButton from '@/components/XButton'
import XColumn from '@/components/XColumn'
import XInput from '@/components/XInput'
import XScreen from '@/components/XScreen'
import XSpace from '@/components/XSpace'
import XText from '@/components/XText'
import { colors } from '@/utils/theme'
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

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert('Erreur', 'Merci de remplir tous les champs.')
      return
    }
    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.')
      return
    }
    if (password !== confirm) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.')
      return
    }
    try {
      setLoading(true)
      // TODO: appel API d'inscription
      // router.replace('/login')
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
          <Image style = {{alignSelf:"center", height:150}} resizeMode='center' source={require("@/assets/images/icon-light.png")} />
          <XColumn style={styles.header}>
            <XText fontSize={32} fontWeight={900} textAlign="center">
              Créer un compte
            </XText>
            <XText fontSize={14} textAlign="center">
              Rejoins-nous en quelques secondes
            </XText>
          </XColumn>

          <XInput
            icon="person-outline"
            placeholder="Nom complet"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <XSpace height={16} />
          <XInput
            icon="mail-outline"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <XSpace height={16} />
          <XInput
            icon="lock-closed-outline"
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <XSpace height={16} />
          <XInput
            icon="lock-closed-outline"
            placeholder="Confirmer le mot de passe"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            autoCapitalize="none"
          />

          <XSpace height={32} />
          <XButton width="100%" loading={loading} onPress={handleRegister}>
            <XText fontSize={16} fontWeight={700} color="white">
              S'inscrire
            </XText>
          </XButton>

          <XSpace height={24} />
          <Pressable style={styles.footer} onPress={() => router.replace('/login')}>
            <XText fontSize={14} textAlign="center">
              Déjà un compte ?{' '}
              <XText fontSize={14} fontWeight={700} color={colors.primary}>
                Se connecter
              </XText>
            </XText>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </XScreen>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: { alignItems: 'center', gap: 8, marginBottom: 40 },
  footer: { alignItems: 'center' },
})