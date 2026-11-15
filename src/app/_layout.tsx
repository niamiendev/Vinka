
import useAuth from "@/hooks/useAuth";
import { AuthProvider } from "@/providers/auth-provider";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";

SplashScreen.preventAutoHideAsync()

const RootNavigator = () => {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) SplashScreen.hideAsync()
  }, [loading])

  if (loading) return null

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />

        <Stack.Protected guard={user === null} >
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        <Stack.Protected guard={user !== null} >
          <Stack.Screen name="(protected)" />
        </Stack.Protected>
      </Stack>
    </>
  )
}


export default function RootLayout() {

  return (
    <AuthProvider>
      <RootNavigator></RootNavigator>
    </AuthProvider>
  )
}
