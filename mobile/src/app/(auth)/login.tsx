import XButton from '@/components/XButton'
import XColumn from '@/components/XColumn'
import XInput from '@/components/XInput'
import XScreen from '@/components/XScreen'
import XSpace from '@/components/XSpace'
import XText from '@/components/XText'
import useAuth from '@/hooks/useAuth'
import { colors } from '@/utils/theme'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  Image, KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet
} from 'react-native'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleLogin = async () => {
    if (!email.trim() || !password) return
    try {
      setLoading(true)
      await login(email, password)
    } catch (error) {
      Alert.alert('Erreur', "" + error)
    }
    finally {
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
          <XColumn style={styles.header}>
            <Image style={{ alignSelf: "center", height: 150 }} resizeMode='center' source={require("@/assets/images/icon-light.png")} />
            <XText fontSize={32} fontWeight={900} textAlign="center">
              Bon retour
            </XText>
            <XText fontSize={14} textAlign="center">
              Connecte-toi pour continuer
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
          <XSpace height={16} />
          <XInput
            icon="lock-closed-outline"
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <Pressable
            style={styles.forgot}
            onPress={() => router.push('/(auth)/forgot')}
            hitSlop={10}
          >
            <XText fontSize={14} color={colors.primary}>
              Mot de passe oublié ?
            </XText>
          </Pressable>

          <XSpace height={24} />
          <XButton width="100%" loading={loading} onPress={handleLogin} disabled = {!email || !password}>
            <XText fontSize={16} fontWeight={700} color="white">
              Se connecter
            </XText>
          </XButton>

          <XSpace height={24} />
          <Pressable style={styles.footer} onPress={() => router.push('/register')}>
            <XText fontSize={14} textAlign="center">
              Pas encore de compte ?{' '}
              <XText fontSize={14} fontWeight={700} color={colors.primary}>
                S'inscrire
              </XText>
            </XText>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </XScreen>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: { alignItems: 'center', gap: 8, marginBottom: 40 },
  forgot: { alignSelf: 'flex-end', marginTop: 12 },
  footer: { alignItems: 'center' },
})